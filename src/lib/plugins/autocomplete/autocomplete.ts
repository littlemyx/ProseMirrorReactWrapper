import { Mark } from "prosemirror-model";
import { Plugin, Selection, TextSelection } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { ReplaceStep } from "prosemirror-transform";

import { ScreenPosition } from "../../types";

import { AutocompletePluginState, SelectedRange } from "./types";

import LocalDataProvider, { DataProvider } from "./dataProvider";

import key from "./key";

function createCorrectionFunction(
  view: EditorView,
  { from, to }: SelectedRange,
  mark?: Mark
) {
  return (correction: string) => {
    let transaction = view.state.tr.replaceWith(
      from,
      to,
      view.state.schema.text(correction, mark)
    );
    const step = transaction.steps[0] as ReplaceStep;
    const map = step.getMap();
    const stepTo = map.map(step.to, 1);
    transaction = transaction.setSelection(
      TextSelection.create(transaction.doc, stepTo)
    );
    transaction.setMeta(key, {
      isPopupVisible: false
    });
    view.dispatch(transaction);
    view.focus();
  };
}

function createAutocompletePlugin(
  dataProvider: DataProvider = new LocalDataProvider()
) {
  return new Plugin<AutocompletePluginState>({
    key,
    view(view) {
      (view.dom as HTMLDivElement).spellcheck = false;
      const pluginKey = this.key;
      return {
        update(editor) {
          const nextPluginState = pluginKey.getState(editor.state);
        }
      };
    },
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
        } else {
          // hide();
          return false;
        }
      },
      handleClick() {
        // hide();
        return false;
      }
    }
  });
}

export default createAutocompletePlugin;
