import { Plugin, TextSelection } from "prosemirror-state";
import { Mark } from "prosemirror-model";
import { EditorView } from "prosemirror-view";

import { ScreenPosition } from "../../types";

import { SelectedRange } from "../types";

import type { DataProvider } from "../dataProvider";

import { AutocompletePluginState } from "./types";
import LocalDataProvider from "./dataProvider";
import { createCorrectionFunction, checkPosition } from "./helpers";
import key from "./key";

function createAutocompletePlugin(
  dataProvider: DataProvider<string, string[]> = new LocalDataProvider()
) {
  return new Plugin<AutocompletePluginState>({
    key,

    state: {
      init() {
        return {
          docChanged: false,
          isPopupVisible: false,
          screenPosition: null,
          clickHandler: null,
          selectedRange: null,
          candidates: [],
          cursorDeco: null,
          ...this.spec.state
        };
      },
      apply(tr, prev) {
        const meta = tr.getMeta(this.spec.key);

        const isPopupVisible = meta?.isPopupVisible ?? prev.isPopupVisible;
        const selectedRange = meta?.selectedRange ?? prev.selectedRange;
        const screenPosition = meta?.screenPosition ?? prev.screenPosition;
        const clickHandler = meta?.clickHandler ?? prev.clickHandler;
        const candidates = meta?.candidates ?? prev.candidates;

        return {
          ...prev,
          docChanged: tr.docChanged,
          isPopupVisible,
          screenPosition,
          clickHandler,
          candidates,
          selectedRange
        };
      }
    },
    props: {
      handleClick(view: EditorView) {
        view.dispatch(
          view.state.tr.setMeta(this.spec.key, {
            isPopupVisible: false
          })
        );
        return false;
      },
      handleKeyDown(view: EditorView, event: KeyboardEvent) {
        const currectState = this.spec.key.getState(view.state);

        if (event.key !== "Tab") {
          if (currectState.isPopupVisible) {
            view.dispatch(
              view.state.tr.setMeta(this.spec.key, {
                isPopupVisible: false
              })
            );
          }
        } else {
          // TODO extract to function

          const {
            $cursor: { pos: cursorPositions }
          } = view.state.selection as TextSelection;

          checkPosition(
            view,
            cursorPositions,
            (
              word: string,
              marks: Mark[],
              screenPosition: ScreenPosition,
              range: SelectedRange
            ) => {
              dataProvider.requestData(word).then(results => {
                if (results.length) {
                  view.dispatch(
                    view.state.tr.setMeta(this.spec.key, {
                      isPopupVisible: true,
                      screenPosition,
                      candidates: results,
                      clickHandler: createCorrectionFunction(view, range, marks)
                    })
                  );
                }
              });
            }
          );

          return true;
        }
      }
    }
  });
}

export default createAutocompletePlugin;
