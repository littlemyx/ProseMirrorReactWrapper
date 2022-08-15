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
  list: [],
  clickHandler: (correction: string) => {}
};

const Popup = ({ subscribeToPluginChanges }: Props) => {
  const [
    { isVisible, word, screenPos, list, clickHandler: clickHandlerProp },
    setState
  ] = useState<PopupState>(defaultProps);

  console.log("popup");

  useEffect(() => {
    const unsubscribe = subscribeToPluginChanges(newProps => {
      const {
        isVisible: newIsVisible,
        word: newWord,
        screenPos: newScerenPos,
        list: newList,
        clickHandler: newClickHandler
      } = newProps;
      if (
        newIsVisible !== isVisible ||
        newWord !== word ||
        newScerenPos !== screenPos ||
        newList !== list ||
        newClickHandler !== clickHandlerProp
      ) {
        setState(newProps);
      }
    });
    return unsubscribe;
  }, [isVisible, word, screenPos, list, clickHandlerProp]);

  const clickHandler = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;

    if (target.tagName === "OPTION") {
      const correction = target.innerText;
      clickHandlerProp(correction);
    }
  };

  return (
    isVisible && (
      <View clickHandler={clickHandler} position={screenPos} items={list} />
    )
  );
};

export default Popup;
