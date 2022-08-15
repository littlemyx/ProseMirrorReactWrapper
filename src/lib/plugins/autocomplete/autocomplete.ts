/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Decoration, DecorationSet } from "prosemirror-view";
import { Mark } from "prosemirror-model";
import {
  Plugin,
  Selection,
  TextSelection,
  Transaction,
  EditorState,
  PluginKey
} from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { ReplaceStep } from "prosemirror-transform";

import {
  SubscribHandler,
  SubscriberCallback,
  Subscriber,
  ScreenPosition
} from "./types";

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

function getSuggestions(prefix: string) {
  return DICT.filter(
    key => key.length > prefix.length && key.startsWith(prefix.toLowerCase())
  );
}

function createCorrectionFunction(
  view: EditorView,
  from: number,
  to: number,
  mark?: Mark
) {
  return (correction: string) => {
    let tr = view.state.tr.replaceWith(
      from,
      to,
      view.state.schema.text(correction, mark)
    );
    const step = tr.steps[0] as ReplaceStep;
    const map = step.getMap();
    const stepTo = map.map(step.to, 1);
    tr = tr.setSelection(TextSelection.create(tr.doc, stepTo));
    view.dispatch(tr);
    view.focus();
  };
}

interface IPluginState {
  init: (
    this: Plugin<IPluginState, any>,
    config: { [key: string]: any },
    instance: EditorState<any>
  ) => IPluginState;
  apply: (
    this: Plugin<IPluginState, any>,
    tr: Transaction<any>,
    value: IPluginState,
    oldState: EditorState<any>,
    newState: EditorState<any>
  ) => IPluginState;
}

function createAutocompletePlugin() {
  const subscribers: Subscriber[] = [];

  const subscribe: SubscribHandler = (callback: SubscriberCallback) => {
    const id = new Date().getTime();
    subscribers.push({ id, callback });

    return () => {
      subscribers.splice(
        subscribers.findIndex(s => s.id === id),
        1
      );
    };
  };

  const hide = () => {
    subscribers.forEach(({ callback }) => callback({ isVisible: false }));
  };

  const plugin = new Plugin<IPluginState>({
    state: {
      init() {
        return {
          lastWord: "",
          ...this.spec.state
        };
      },
      apply(tr, prevPluginState, oldState, state) {
        hide();

        return {
          ...this.spec.state
        };
      }
    },
    props: {
      handleKeyDown(view: EditorView, event: KeyboardEvent) {
        if (event.key === "Tab") {
          const {
            $cursor: { pos: endOfDocPosition }
          } = Selection.atEnd(view.state.doc) as TextSelection;

          const {
            $cursor: { pos: cursorPositions }
          } = view.state.selection as TextSelection;

          // TODO deal with names
          const node = view.state.doc.nodeAt(cursorPositions - 1);

          const resolvedPos = view.state.doc.resolve(cursorPositions);
          const parentInfo = resolvedPos.parent.childBefore(
            resolvedPos.parentOffset
          );
          const linkNode = parentInfo.node;
          const linkStartPos = parentInfo.offset;
          const posInParent = resolvedPos.parentOffset;
          const offsetInLink = posInParent - linkStartPos;
          const linkFrom = cursorPositions - offsetInLink;
          const linkTo = linkFrom + linkNode.nodeSize;

          const token = view.state.doc.textBetween(linkFrom, linkTo, " ");

          const letterRegEx = /\w/g;
          const matchLetter =
            token.length > 0
              ? token[token.length - 1].match(letterRegEx)
              : null;

          if (cursorPositions === linkTo && matchLetter !== null) {
            const wordRegEx = /\w+/g;
            const matchWord = node.text.match(wordRegEx);

            const word = matchWord[matchWord.length - 1];

            const cursorViewPortPosition = view.coordsAtPos(cursorPositions);

            const screenPos: ScreenPosition = {
              x: cursorViewPortPosition.left,
              y: cursorViewPortPosition.top + 10
            };

            const suggestions = getSuggestions(word);

            if (suggestions.length) {
              subscribers.forEach(({ callback }) => {
                callback({
                  isVisible: true,
                  word,
                  screenPos,
                  suggestions,
                  clickHandler: createCorrectionFunction(
                    view,
                    linkTo - word.length,
                    linkTo,
                    node.marks
                  )
                });
              });
            }
          }

          return true;
        }
        return false;
      },
      handleClick(view: EditorView, pos: number, event: MouseEvent) {
        // sboxHide(getSbox());
        hide();
        return false;
      },
      handleTextInput(
        view: EditorView,
        from: number,
        to: number,
        text: string
      ) {
        // Suggest only in the end of text
        // if (view.state.doc.content.size - 1 === from) {
        //   sync(
        //     function () {
        //       const { lastWord } = this.getState(view.state);
        //       const correction = DICT[lastWord];
        //       if (correction !== undefined) {
        //         const node = view.state.schema.text(
        //           correction,
        //           view.state.schema.marks.strong.create()
        //         );

        //         // Со вставкой текста постоянно происходит какая-то оказия
        //         let tr = view.state.tr.insert(view.state.selection.from, node);

        //         tr = tr.setSelection(
        //           TextSelection.create(tr.doc, view.state.selection.from)
        //         );

        //         view.dispatch(tr);
        //       }
        //     }.bind(this)
        //   );
        // }

        return false;
      }
    }
  });

  return { plugin, subscribe };
}

// TODO: this is a hack to get the plugin to work with delayed updates
const sync = (function () {
  let timerId: ReturnType<typeof setTimeout> | null = null;
  return function (callback: () => void) {
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      clearTimeout(timerId);
      callback();
    }, 1000);
  };
})();

export default createAutocompletePlugin;
