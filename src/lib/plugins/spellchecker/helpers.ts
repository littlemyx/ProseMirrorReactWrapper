import { Decoration, DecorationSet } from "prosemirror-view";
import { TextSelection } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { Node } from "prosemirror-model";

import { SelectedRange } from "../types";

import { Word, Error, ErrorMap } from "./types";
import key from "./key";

/**
 * Traverses the document and returns each words in the document separately with its borders.
 */

export function gatherAllWords(doc: Node) {
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

/**
 *
 * Creates a map of errors for a given document.
 * Maps helps to compare the ragne in the doc with the suggested variants of replacement.
 *
 */

export function createErrorMap(errors: Error[]) {
  const map = {} as ErrorMap;
  errors.forEach(error => {
    if (error.correction.length) {
      const key = `${error.from}-${error.to}`;
      map[key] = error.correction;
    }
  });

  return map;
}

export function createDecorations(errors: Word[], doc: Node) {
  const decos: Decoration[] = [];
  errors.forEach(prob => {
    decos.push(Decoration.inline(prob.from, prob.to, { class: "spellError" }));
  });
  return DecorationSet.create(doc, decos);
}

/**
 *
 * Creates the function that will be used to replace the word with the correction
 *
 **/

export function createCorrectionFunction(
  view: EditorView,
  { from, to }: SelectedRange
) {
  return (correction: string) => {
    let transaction = view.state.tr.replaceWith(
      from,
      to,
      view.state.schema.text(correction)
    );
    const $newPos = transaction.doc.resolve(
      transaction.mapping.map(from + correction.length)
    );
    transaction = transaction.setSelection(new TextSelection($newPos, $newPos));
    transaction.setMeta(key, {
      isPopupVisible: false
    });
    view.dispatch(transaction);

    view.focus();
  };
}

/**
 *
 * Cheap version of debouncer. Works only for one function
 *
 *  Можно было бы использовать библиотеку lodash и использовать метод debounce, либо же реализовать самостоятельно,
 *  но для существующей задачи нет желания усложнять
 *
 * */


export const debouncedCall = (function () {
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
