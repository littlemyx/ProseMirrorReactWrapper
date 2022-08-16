import { Decoration, DecorationSet } from "prosemirror-view";
import { TextSelection } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { Node } from "prosemirror-model";

import { SelectedRange } from "../types";

import { Word, Error, ErrorMap } from "./types";
import key from "./key";

export function getherAllWords(doc: Node) {
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

// TODO: this is a hack to get the plugin to work with delayed updates
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
