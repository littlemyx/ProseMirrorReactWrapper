import "./index.css";

import React from "react";

import { ScreenPosition } from "../../types";

import View from "./View";

interface Props {
  isVisible: boolean;
  items: string[];
  screenPosition: ScreenPosition;
  clickHandler: (_correction: string) => void;
}

const Popup = ({
  isVisible,
  screenPosition,
  items,
  clickHandler: clickHandlerProp
}: Props) => {
  const clickHandler = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;

    if (target.tagName === "LI") {
      const value = target.innerText;
      clickHandlerProp(value);
    }
  };

  return (
    <>
      {isVisible && (
        <View clickHandler={clickHandler} position={screenPosition}>
          <ul>
            {items.map(item => (
              <li value={item} key={item} className="popupItem">
                {item}
              </li>
            ))}
          </ul>
        </View>
      )}
      {isVisible && items.length === 0 && (
        <View position={screenPosition}>
          <div className="emptyList">No options were provided</div>
        </View>
      )}
    </>
  );
};

export default Popup;
