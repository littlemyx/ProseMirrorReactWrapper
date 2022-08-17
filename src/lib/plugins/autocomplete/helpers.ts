import { Mark, Node } from "prosemirror-model";
import { TextSelection } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { ReplaceStep } from "prosemirror-transform";

import { SelectedRange } from "../types";
import { ScreenPosition } from "../../types";

import key from "./key";

/**
 *
 * Creates the function that will be used to replace the word with the correction
 *
 **/

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

/**
 * Function to check and react on autocomplete initiation event
 * Finds the node by the position of the cursor and checks if it is a word calling a callback function after this
 */

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
  const { node, from, to } = getNodeByPosition(view.state.doc, position);

  const token = view.state.doc.textBetween(from, to, " ");

  const letterRegEx = /\w/g;
  const matchLetter =
    token.length > 0 ? token[token.length - 1].match(letterRegEx) : null;

  if (position === to && matchLetter !== null) {
    const word = getLastWordFromNode(node);

    const cursorViewPortPosition = view.coordsAtPos(position);

    const screenPosition: ScreenPosition = {
      x: cursorViewPortPosition.left,
      y: cursorViewPortPosition.bottom + 4
    };

    const range: SelectedRange = {
      from: to - word.length,
      to: to
    };

    callback(word, node.marks as Mark[], screenPosition, range);
  }
}

/**
 * Takes a node and returns the last word from it
 */

export function getLastWordFromNode(node: Node) {
  const wordRegEx = /\w+/g;
  const matchWord = node.text.match(wordRegEx);

  return matchWord[matchWord.length - 1];
}

/**
 * Takes a doc and a position in it and a node which contain this position
 */

export function getNodeByPosition(doc: Node, position: number) {
  const resolvedPos = doc.resolve(position);
  const parentInfo = resolvedPos.parent.childBefore(resolvedPos.parentOffset);
  const node = parentInfo.node;
  const nodeStartPos = parentInfo.offset;
  const posInParent = resolvedPos.parentOffset;
  const offsetInLink = posInParent - nodeStartPos;
  const nodeFrom = position - offsetInLink;
  const nodeTo = nodeFrom + node.nodeSize;

  return { node, from: nodeFrom, to: nodeTo };
}
