import React from "react";
import { EditorState } from "prosemirror-state";

import Popup from "../../components/Popup";

import key from "./key";
import { SpellcheckerPluginState } from "./types";

interface Props {
  state: EditorState;
}

const SpellcheckerPopup = ({ state }: Props) => {
  const {
    isPopupVisible: isVisible,
    selectedRange,
    screenPosition,
    clickHandler = () => {},
    errorMap
  } = key.getState(state) as SpellcheckerPluginState;

  const keyForErrorMap = `${selectedRange?.from}-${selectedRange?.to}`;

  return (
    <Popup
      isVisible={isVisible}
      screenPosition={screenPosition}
      items={errorMap[keyForErrorMap] ?? []}
      clickHandler={clickHandler}
    />
  );
};

export default SpellcheckerPopup;
