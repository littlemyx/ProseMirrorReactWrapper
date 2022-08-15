import { Mark } from "prosemirror-model";
import { Plugin, Selection, TextSelection } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { ReplaceStep } from "prosemirror-transform";

import { Subscriber, ScreenPosition, BasePluginState } from "../../types";

import LocalDataProvider, { DataProvider } from "./dataProvider";

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

function createAutocompletePlugin(
  subscribers: Subscriber[],
  hide: () => void, // TODO need to change to api with generic functions,
  dataProvider: DataProvider = new LocalDataProvider()
) {
  return new Plugin<BasePluginState>({
    state: {
      init() {
        return {
          ...this.spec.state
        };
      },
      apply() {
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
              y: cursorViewPortPosition.bottom + 4
            };

            dataProvider.requestData(word).then(results => {
              if (results.length) {
                subscribers.forEach(({ callback }) => {
                  callback({
                    isVisible: true,
                    word,
                    screenPos,
                    list: results,
                    clickHandler: createCorrectionFunction(
                      view,
                      linkTo - word.length,
                      linkTo,
                      node.marks
                    )
                  });
                });
              }
            });
          }

          return true;
        }
        return false;
      },
      handleClick() {
        hide();
        return false;
      }
    }
  });
}

export default createAutocompletePlugin;
