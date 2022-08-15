import React, { useState } from "react";
import { usePopper } from "react-popper";

import { ScreenPosition } from "../../types";

interface Props {
  items: string[];
  clickHandler: (event: React.MouseEvent) => void;
  position: ScreenPosition;
}

const View = ({ clickHandler, items, position }: Props) => {
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [{ name: "arrow", options: { element: arrowElement } }]
  });

  return (
    <>
      <div
        className="popupAnchor"
        style={{ top: position.y, left: position.x }}
        ref={setReferenceElement}
      />

      <div ref={setPopperElement} style={styles.popper} {...attributes.popper}>
        <div className="popup" onClick={clickHandler}>
          {items.map(item => (
            <option value={item} key={item} className="popupItem">
              {item}
            </option>
          ))}
        </div>
        <div ref={setArrowElement} style={styles.arrow} />
      </div>
    </>
  );
};

export default View;
