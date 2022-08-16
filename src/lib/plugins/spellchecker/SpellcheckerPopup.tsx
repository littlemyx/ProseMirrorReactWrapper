import React from "react";
import { EditorState } from "prosemirror-state";

import Popup from "../../components/Popup";

import key from "./key";
import { AutocompletePluginState } from "./types";

interface Props {
  state: EditorState;
}

const SpellcheckerPopup = ({ state }: Props) => {
  const {
    isPopupVisible: isVisible,
    selectedRange,
    screenPositios,
    errorMap
  } = key.getState(state) as AutocompletePluginState;

  const keyForErrorMap = `${selectedRange?.from}-${selectedRange?.to}`;

  return (
    <Popup
      isVisible={isVisible}
      screenPosition={screenPositios}
      items={errorMap[keyForErrorMap] ?? []}
      clickHandler={() => {}}
    />
  );
};

export default SpellcheckerPopup;
