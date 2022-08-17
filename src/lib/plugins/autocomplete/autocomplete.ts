/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Plugin, Selection, TextSelection } from "prosemirror-state";
import { EditorView } from "prosemirror-view";

import { ScreenPosition } from "../../types";

import { SelectedRange } from "../types";

import { AutocompletePluginState } from "./types";
import LocalDataProvider from "./dataProvider";
import type { DataProvider } from "../dataProvider";
import { createCorrectionFunction } from "./helpers";
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

            const screenPosition: ScreenPosition = {
              x: cursorViewPortPosition.left,
              y: cursorViewPortPosition.bottom + 4
            };

            const range: SelectedRange = {
              from: linkTo - word.length,
              to: linkTo
            };

            dataProvider.requestData(word).then(results => {
              if (results.length) {
                view.dispatch(
                  view.state.tr.setMeta(this.spec.key, {
                    isPopupVisible: true,
                    screenPosition,
                    candidates: results,
                    clickHandler: createCorrectionFunction(
                      view,
                      range,
                      node.marks
                    )
                  })
                );
              }
            });
          }

          return true;
        }
      }
    }
  });
}

export default createAutocompletePlugin;
