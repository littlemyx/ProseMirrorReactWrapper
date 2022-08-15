import React, { useEffect, useState } from "react";
import { EditorState } from "prosemirror-state";

import {
  SubscribHandler,
  SubscriberCallback,
  Subscriber,
  ScreenPosition,
  PopupState
} from "../types";

import "./index.css";

interface Props {
  subscribeToPluginChanges: SubscribHandler;
}

const Popup = ({ subscribeToPluginChanges }: Props) => {
  const [
    { isVisible, word, screenPos, suggestions, clickHandler: clickHandlerProp },
    setState
  ] = useState<PopupState>({
    isVisible: false,
    word: "",
    screenPos: { x: 0, y: 0 },
    suggestions: [],
    clickHandler: (correction: string) => {}
  });

  useEffect(() => {
    const unsubscribe = subscribeToPluginChanges(setState);
    return unsubscribe;
  });

  const clickHandler = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;

    if (target.tagName === "OPTION") {
      const correction = target.innerText;
      clickHandlerProp(correction);
    }
  };

  return (
    isVisible && (
      <div className="popup" onClick={clickHandler}>
        {suggestions.map(suggestion => (
          <option value={suggestion} key={suggestion} className="popupItem">
            {suggestion}
          </option>
        ))}
      </div>
    )
  );
};

export default Popup;
