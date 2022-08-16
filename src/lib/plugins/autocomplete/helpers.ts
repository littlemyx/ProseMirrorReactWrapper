import { Mark } from "prosemirror-model";
import { TextSelection } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { ReplaceStep } from "prosemirror-transform";

import { SelectedRange } from "../types";

import key from "./key";

export function createCorrectionFunction(
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
