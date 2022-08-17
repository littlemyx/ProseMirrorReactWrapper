import React, { PropsWithChildren, useState } from "react";
import { usePopper } from "react-popper";

import { ScreenPosition } from "../../types";

interface Props {
  clickHandler?: (_event: React.MouseEvent) => void;
  position: ScreenPosition;
}

const View = ({
  clickHandler = () => {},
  position,
  children
}: PropsWithChildren<Props>) => {
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
          {children}
        </div>
        <div ref={setArrowElement} style={styles.arrow} />
      </div>
    </>
  );
};

export default View;
