import { Mark } from "prosemirror-model";
import { TextSelection } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { ReplaceStep } from "prosemirror-transform";

import { SelectedRange } from "../types";
import { ScreenPosition } from "../../types";

import key from "./key";

export function createCorrectionFunction(
  view: EditorView,
  { from, to }: SelectedRange,
  marks?: Mark[]
) {
  return (correction: string) => {
    let transaction = view.state.tr.replaceWith(
      from,
      to,
      view.state.schema.text(correction, marks)
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

export function checkPosition(
  view: EditorView,
  position: number,
  callback: (
    _word: string,
    _marks: Mark[],
    _screenPosition: ScreenPosition,
    _range: SelectedRange
  ) => void
) {
  const resolvedPos = view.state.doc.resolve(position);
  const parentInfo = resolvedPos.parent.childBefore(resolvedPos.parentOffset);
  const node = parentInfo.node;
  const nodeStartPos = parentInfo.offset;
  const posInParent = resolvedPos.parentOffset;
  const offsetInLink = posInParent - nodeStartPos;
  const nodeFrom = position - offsetInLink;
  const nodeTo = nodeFrom + node.nodeSize;

  const token = view.state.doc.textBetween(nodeFrom, nodeTo, " ");

  const letterRegEx = /\w/g;
  const matchLetter =
    token.length > 0 ? token[token.length - 1].match(letterRegEx) : null;

  if (position === nodeTo && matchLetter !== null) {
    const wordRegEx = /\w+/g;
    const matchWord = node.text.match(wordRegEx);

    const word = matchWord[matchWord.length - 1];

    const cursorViewPortPosition = view.coordsAtPos(position);

    const screenPosition: ScreenPosition = {
      x: cursorViewPortPosition.left,
      y: cursorViewPortPosition.bottom + 4
    };

    const range: SelectedRange = {
      from: nodeTo - word.length,
      to: nodeTo
    };

    callback(word, node.marks, screenPosition, range);
  }
}
