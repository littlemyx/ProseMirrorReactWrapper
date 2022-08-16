/* eslint-disable @typescript-eslint/ban-ts-comment */ // TODO do we need this?
import "./index.css";
import { DecorationSet } from "prosemirror-view";
import { Plugin, EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";

import { SelectedRange } from "../types";

import { Word, Error, SpellcheckerPluginState } from "./types";
import LocalDataProvider from "./dataProvider";
import type { DataProvider } from "../dataProvider";
import {
  debouncedCall,
  getherAllWords,
  createDecorations,
  createErrorMap,
  createCorrectionFunction
} from "./helpers";
import key from "./key";

function createAutocompletePlugin(
  dataProvider: DataProvider<Word[], Error[]> = new LocalDataProvider()
) {
  return new Plugin<SpellcheckerPluginState>({
    key,
    view(view) {
      (view.dom as HTMLDivElement).spellcheck = false;
      const pluginKey = this.key;
      return {
        update(editor) {
          const nextPluginState = pluginKey.getState(editor.state);

          if (nextPluginState.docChanged) {
            debouncedCall(async () => {
              const words = getherAllWords(editor.state.doc);
              const errors = await dataProvider.requestData(words);
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
          screenPosition: null,
          clickHandler: null,
          selectedRange: null,
          cursorDeco: null,
          ...this.spec.state
        };
      },
      apply(tr, prev) {
        const meta = tr.getMeta(this.spec.key);

        const decoration = meta?.decorations ?? prev.decoration;
        const errors = meta?.errors ?? prev.errors;
        const errorMap = meta?.errorMap ?? prev.errorMap;
        const selectedRange = meta?.selectedRange ?? prev.selectedRange;
        const isPopupVisible = errorMap[selectedRange]
          ? meta?.isPopupVisible ?? prev.isPopupVisible
          : false;

        const screenPosition = meta?.screenPosition ?? prev.screenPosition;
        const clickHandler = meta?.clickHandler ?? prev.clickHandler;

        return {
          ...prev,
          docChanged: tr.docChanged,
          decoration,
          errors,
          isPopupVisible,
          screenPosition,
          clickHandler,
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
      handleClick(view: EditorView, pos: number, event: MouseEvent) {
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
          const screenPosition = {
            x: event.pageX,
            y: coords.bottom - 4
          };

          const range: SelectedRange = { from: from + 1, to: to + 1 };

          view.dispatch(
            view.state.tr.setMeta(this.spec.key, {
              isPopupVisible: true,
              screenPosition,
              clickHandler: createCorrectionFunction(view, range),
              // Я понимаю что тут видимо как-то нужно использовать map, но не очень понимаю как именно
              selectedRange: range
            })
          );

          event.preventDefault();
          return true;
        }
      }
    }
  });
}

export default createAutocompletePlugin;
