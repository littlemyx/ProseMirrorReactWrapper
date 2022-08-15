import "./index.css";

import React, { useEffect, useState } from "react";

import { SubscribHandler, PopupState } from "../../types";

import View from "./View";

interface Props {
  subscribeToPluginChanges: SubscribHandler;
}

const defaultProps: PopupState = {
  isVisible: false,
  word: "",
  screenPos: { x: 0, y: 0 },
  suggestions: [],
  clickHandler: (correction: string) => {}
};

const Popup = ({ subscribeToPluginChanges }: Props) => {
  const [
    { isVisible, word, screenPos, suggestions, clickHandler: clickHandlerProp },
    setState
  ] = useState<PopupState>(defaultProps);

  console.log("popup");

  useEffect(() => {
    const unsubscribe = subscribeToPluginChanges(newProps => {
      const {
        isVisible: newIsVisible,
        word: newWord,
        screenPos: newScerenPos,
        suggestions: newSuggestions,
        clickHandler: newClickHandler
      } = newProps;
      if (
        newIsVisible !== isVisible ||
        newWord !== word ||
        newScerenPos !== screenPos ||
        newSuggestions !== suggestions ||
        newClickHandler !== clickHandlerProp
      ) {
        setState(newProps);
      }
    });
    return unsubscribe;
  }, [isVisible, word, screenPos, suggestions, clickHandlerProp]);

  const clickHandler = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;

    if (target.tagName === "OPTION") {
      const correction = target.innerText;
      clickHandlerProp(correction);
    }
  };

  return (
    isVisible && (
      <View
        clickHandler={clickHandler}
        position={screenPos}
        items={suggestions}
      />
    )
  );
};

export default Popup;
