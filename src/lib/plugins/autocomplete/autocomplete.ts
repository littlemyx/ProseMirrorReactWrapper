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

import key from "./key";

const DICT = { don: "key", zeb: "ra", li: "on", ki: "tten" };

interface IEditorState {
  doc: Node;
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
  lastWord: string;
}

function autocompletePlugin() {
  return new Plugin<IPluginState>({
    view(view) {
      view.dom.spellcheck = false;
      return {};
    },
    key,

    state: {
      init() {
        return {
          lastWord: "",
          ...this.spec.state
        };
      },
      apply(tr, prevPluginState, oldState, state) {
        let { lastWord } = prevPluginState;
        if (tr.steps[0] instanceof ReplaceStep) {
          const step = tr.steps[0];
          const node = state.doc.nodeAt(step.from);
          const text = node?.text ?? "";
          const wordRegEx = /\w+/g;
          const letterRegEx = /\w/g;
          const matchWord = text.match(wordRegEx);
          const matchLetter =
            text.length > 0 ? text[text.length - 1].match(letterRegEx) : null;

          if (matchWord !== null && matchLetter !== null) {
            lastWord = matchWord[matchWord.length - 1];
          } else {
            lastWord = "";
          }
        }

        console.log(lastWord);

        return {
          lastWord,
          ...this.spec.state
        };
      }
    },
    props: {
      decorations(state: EditorState) {
        const { decos } = this.getState(state);
        return decos;
      },
      handleKeyDown() {},
      handleTextInput(
        view: EditorView,
        from: number,
        to: number,
        text: string
      ) {
        // Suggest only in the end of text
        if (view.state.doc.content.size - 1 === from) {
          sync(
            function () {
              const { lastWord } = this.getState(view.state);
              const correction = DICT[lastWord];
              if (correction !== undefined) {
                const node = view.state.schema.text(
                  correction,
                  view.state.schema.marks.strong.create()
                );

                // Со вставкой текста постоянно происходит какая-то оказия
                let tr = view.state.tr.insert(view.state.selection.from, node);

                tr = tr.setSelection(
                  TextSelection.create(tr.doc, view.state.selection.from)
                );

                view.dispatch(tr);
              }
            }.bind(this)
          );
        }

        return false;
      }
    }
  });
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

export default autocompletePlugin;
