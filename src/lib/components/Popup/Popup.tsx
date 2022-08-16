import "./index.css";

import React from "react";

import { ScreenPosition } from "../../types";

import View from "./View";

interface Props {
  isVisible: boolean;
  items: string[];
  screenPosition: ScreenPosition;
  clickHandler: (correction: string) => void;
}

const Popup = ({
  isVisible,
  screenPosition,
  items,
  clickHandler: clickHandlerProp
}: Props) => {
  const clickHandler = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;

    if (target.tagName === "OPTION") {
      const value = target.innerText;
      clickHandlerProp(value);
    }
  };

  return (
    <>
      {isVisible && (
        <View
          clickHandler={clickHandler}
          position={screenPosition}
          items={items}
        />
      )}
    </>
  );
};

export default Popup;
