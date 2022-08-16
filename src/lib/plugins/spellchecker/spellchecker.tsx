/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Decoration, DecorationSet } from "prosemirror-view";
import {
  Plugin,
  TextSelection,
  Transaction,
  EditorState,
  PluginKey
} from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { ReplaceStep } from "prosemirror-transform";
import { Node } from "prosemirror-model";

import { Word, ErrorMap, AutocompletePluginState } from "./types";

import key from "./key";

import "./index.css";

type Error = Word & { correction?: string[] };

function getherAllWords(doc: Node) {
  const words: Word[] = [];

  function record(text: string, from: number, to: number) {
    words.push({ text, from, to });
  }

  // For each node in the document
  doc.descendants((node: Node, pos: number) => {
    if (node.isText) {
      const wordRegEx = /\w+/g;
      let match = null;
      // Scan text nodes for suspicious patterns
      while ((match = wordRegEx.exec(node.text)))
        record(
          match[0],
          doc.resolve(pos + match.index).pos,
          doc.resolve(pos + match.index + match[0].length).pos
        );
    }
  });

  return words;
}

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

const checkWords = (words: Word[]): Error[] => {
  const errors: Error[] = [];
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (!DICT.includes(word.text)) {
      const candidates = suggester(word.text);
      errors.push({ ...word, correction: candidates });
    }
  }
  return errors;
};

function lint(doc: Node) {
  const words = getherAllWords(doc);
  const errors = checkWords(words);

  return errors;
}

function createErrorMap(errors: Error[]) {
  const map = {} as ErrorMap;
  errors.forEach(error => {
    const key = `${error.from}-${error.to}`;
    map[key] = error.correction;
  });

  return map;
}

function createDecorations(errors: Word[], doc: Node) {
  const decos: Decoration[] = [];
  errors.forEach(prob => {
    decos.push(Decoration.inline(prob.from, prob.to, { class: "spellError" }));
  });
  return DecorationSet.create(doc, decos);
}

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

// TODO: this is a hack to get the plugin to work with delayed updates
const debouncedCall = (function () {
  let timerId: ReturnType<typeof setTimeout> | null = null;
  return function (callback: () => void, timeout = 5000) {
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      clearTimeout(timerId);
      callback();
    }, timeout);
  };
})();

function createAutocompletePlugin() {
  return new Plugin<AutocompletePluginState>({
    key,
    view(view) {
      (view.dom as HTMLDivElement).spellcheck = false;
      const pluginKey = this.key;
      return {
        update(editor) {
          const nextPluginState = pluginKey.getState(editor.state);
          if (nextPluginState.docChanged) {
            debouncedCall(() => {
              const errors = lint(editor.state.doc);
              const decorations = createDecorations(errors, editor.state.doc);
              const errorMap = createErrorMap(errors);

              editor.dispatch(
                editor.state.tr.setMeta(pluginKey, {
                  decorations,
                  errors,
                  errorMap
                })
              );
            }, 2000);
          }
        }
      };
    },

    state: {
      init() {
        return {
          docChanged: false,
          isPopupVisible: false,
          decoration: DecorationSet.empty,
          errors: [],
          errorMap: {},
          screenPositios: null,
          selectedRange: null,
          cursorDeco: null,
          ...this.spec.state
        };
      },
      apply(tr, prev) {
        const meta = tr.getMeta(this.spec.key);

        const decoration = meta?.decorations ?? prev.decoration;
        const errors = meta?.errors ?? prev.errors;
        const isPopupVisible = meta?.isPopupVisible ?? prev.isPopupVisible;
        const errorMap = meta?.errorMap ?? prev.errorMap;
        const selectedRange = meta?.selectedRange ?? prev.selectedRange;
        const screenPositios = meta?.screenPositios ?? prev.screenPositios;

        return {
          ...prev,
          docChanged: tr.docChanged,
          decoration,
          errors,
          isPopupVisible,
          screenPositios,
          selectedRange,
          errorMap
        };
      }
    },
    props: {
      decorations(state: EditorState) {
        const { decoration } = this.getState(state);
        return decoration;
      },
      // handleClick(view: EditorView, pos: number, event: MouseEvent) {
      //   const { $cursor } = view.state.selection as TextSelection;

      //   const { pos: cursorPositions } = $cursor ?? {};
      //   console.log(cursorPositions);
      //   view.dispatch(
      //     view.state.tr.setMeta(this.spec.key, {
      //       isPopupVisible: false
      //     })
      //   );
      //   return false;
      // },
      // Потому что contextmenu
      handleClick(view: EditorView, pos: number, event: MouseEvent) {
        //@ts-ignore
        if (!event.altKey) {
          view.dispatch(
            view.state.tr.setMeta(this.spec.key, {
              isPopupVisible: false
            })
          );
        } else {
          const { decoration } = this.getState(view.state);
          const deco = decoration.find(pos, pos)[0];
          if (!deco) return;

          const $f = view.state.doc.resolve(deco.from);
          const from = deco.from - $f.start();
          // const from = deco.from;
          const to = deco.to - $f.start();
          // const to = deco.to;
          const token = $f.parent.textBetween(from, to, " ");
          if (!token) return; // sanity

          const coords = view.coordsAtPos(pos);
          const screenPositios = {
            x: event.pageX,
            y: coords.bottom - 4
          };

          // const results: string[] = suggester(token);

          // if (results.length) {
          view.dispatch(
            view.state.tr.setMeta(this.spec.key, {
              isPopupVisible: true,
              screenPositios,
              // Because we have added style and it enlarged the block. A bit hacky.
              selectedRange: { from: from + 1, to: to + 1 }
            })
          );
          // }

          event.preventDefault();
          return true;
        }
      }
    }
  });
}

export default createAutocompletePlugin;
