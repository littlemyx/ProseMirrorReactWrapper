import { Command, toggleMark } from "prosemirror-commands";
import { TextSelection } from "prosemirror-state";

import key from "./key";

const tabHandler: Command = (state, dispatch) => {
  console.log("tabHandler");

  // const correction = "ending";
  const correction = state.doc.textBetween(
    state.selection.from,
    state.doc.content.size,
    " "
  );

  const node = state.schema.text(correction);

  // Со вставкой текста постоянно происходит какая-то оказия
  let tr = state.tr.replaceWith(
    state.selection.from,
    state.doc.content.size - 1,
    node
  );

  tr = tr.setSelection(
    TextSelection.create(tr.doc, state.doc.content.size - 1)
  );

  dispatch(tr);

  // if (state.selection.empty) return false;
  // if (dispatch) dispatch(state.tr.deleteSelection().scrollIntoView());
  return true;
};

export default tabHandler;
