/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Decoration, DecorationSet } from "prosemirror-view";
import {
  Plugin,
  TextSelection,
  Transaction,
  EditorState
} from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { ReplaceStep } from "prosemirror-transform";

import { Subscriber, BasePluginState } from "../../types";

import "./index.css";

const DICT = [
  "donkey",
  "dolphin",
  "dog",
  "zebra",
  "snake",
  "snail",
  "sparrow",
  "spider",
  "shark",
  "lion",
  "lobster",
  "lizard",
  "lama",
  "locust",
  "cat",
  "rabbit",
  "giraffi",
  "horse"
];

const suggester = (token: string) => {
  const result = new Set<string>();
  const dict = [...DICT];
  for (let i = 1; i < token.length; i++) {
    const char = token.slice(0, i);
    const words = dict.filter(d => d.startsWith(char));
    words.forEach(word => {
      if (word.length > token.length - 2 && word.length < token.length + 2)
        result.add(word);
    });
  }

  return Array.from(result);
};

const typo = {
  ignore: (token: string): void => {
    DICT.push(token);
  },
  suggest: (
    arg?: any,
    arg2?: any,
    callback1?: () => void,
    callback2?: (arg: any) => void
  ): void => {},
  check: (value: string): boolean => {
    return DICT.includes(value);
  }
};

function getRangeFromTransform(tr: Transaction) {
  let trFrom, trTo;
  for (let i = 0; i < tr.steps.length; i++) {
    const step = tr.steps[i] as ReplaceStep;
    const map = step.getMap();
    const stepFrom = map.map(step.from, -1);
    const stepTo = map.map(step.to, 1);
    trFrom = trFrom ? map.map(trFrom, -1) : stepFrom;
    trTo = trTo ? map.map(trTo, 1) : stepTo;
  }
  return {
    trFrom,
    trTo
  };
}

function createCorrectionFunction(view: EditorView, deco: Decoration) {
  return (correction: string) => {
    let tr = view.state.tr.replaceWith(
      deco.from,
      deco.to,
      view.state.schema.text(correction)
    );
    let $newPos = tr.doc.resolve(tr.mapping.map(deco.from + correction.length));
    tr = tr.setSelection(new TextSelection($newPos, $newPos));
    view.dispatch(tr);
    view.focus();
  };
}

interface AutocompletePlugin extends BasePluginState {
  decos: DecorationSet;
  cursorDeco: Decoration;
}

function createAutocompletePlugin(subscribers: Subscriber[], hide: () => void) {
  return new Plugin<AutocompletePlugin>({
    view(view) {
      (view.dom as HTMLDivElement).spellcheck = false;
      return {};
    },

    state: {
      init() {
        return {
          decos: DecorationSet.empty,
          cursorDeco: null,
          ...this.spec.state
        };
      },
      apply(tr, prev, oldState, state) {
        console.log("apply was called");
        hide();

        let { decos, cursorDeco } = this.getState(oldState);
        decos = decos.map(tr.mapping, tr.doc);

        if (cursorDeco) {
          decos = decos.add(state.doc, [cursorDeco]);
          cursorDeco = null;
        }

        if (!tr.selection.empty || !tr.docChanged)
          return {
            decos,
            cursorDeco,
            ...this.spec.state
          };

        const { trFrom, trTo } = getRangeFromTransform(tr);
        if (!trFrom || !trTo)
          return {
            decos,
            cursorDeco,
            ...this.spec.state
          };

        const $t = state.doc.resolve(trTo);
        const txtFrom = $t.start();
        const txtTo = $t.end();

        const txt = state.doc.textBetween(txtFrom, txtTo, " ");
        const reg = /\w+/g;
        let match = null;
        while ((match = reg.exec(txt)) != null) {
          const token = match[0];
          const tokenFrom = match.index;
          const tokenTo = reg.lastIndex;
          if (tokenTo < trFrom && tokenFrom > trTo) continue;
          decos = decos.remove(
            decos.find(txtFrom + tokenFrom, txtFrom + tokenTo)
          );

          if (!typo.check(match[0])) {
            const deco = Decoration.inline(
              txtFrom + tokenFrom,
              txtFrom + tokenTo,
              {
                class: "spellError"
              }
            );
            if ($t.pos == txtFrom + tokenTo) {
              cursorDeco = deco;
            } else {
              decos = decos.add(state.doc, [deco]);
            }
          }
        }

        return {
          decos,
          cursorDeco,
          ...this.spec.state
        }; //: decos.map(tr.mapping, tr.doc), cursorDeco }
      }
    },
    props: {
      decorations(state: EditorState) {
        const { decos } = this.getState(state);
        return decos;
      },
      // Потому что contextmenu
      handleDoubleClick(view: EditorView, pos: number, event: MouseEvent) {
        const { decos } = this.getState(view.state);
        const deco = decos.find(pos, pos)[0];
        if (!deco) return;

        const $f = view.state.doc.resolve(deco.from),
          $t = view.state.doc.resolve(deco.to);
        let token = $f.parent.textBetween(
          deco.from - $f.start(),
          deco.to - $f.start(),
          " "
        );
        if (!token) return; // sanity

        const coords = view.coordsAtPos(pos);
        const screenPos = {
          x: event.pageX,
          y: coords.bottom - 4
        };

        const results: string[] = suggester(token);

        if (results.length) {
          subscribers.forEach(({ callback }) => {
            callback({
              isVisible: true,
              word: token,
              screenPos,
              list: results,
              clickHandler: createCorrectionFunction(view, deco)
            });
          });
        }

        event.preventDefault();
        return true;
      }
    }
  });
}

export default createAutocompletePlugin;
