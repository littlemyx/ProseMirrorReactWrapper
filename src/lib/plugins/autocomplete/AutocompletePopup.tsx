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
    clickHandler = () => {},
    screenPosition,
    candidates
  } = key.getState(state) as AutocompletePluginState;

  return (
    <Popup
      isVisible={isVisible}
      screenPosition={screenPosition}
      items={candidates}
      clickHandler={clickHandler}
    />
  );
};

export default SpellcheckerPopup;
