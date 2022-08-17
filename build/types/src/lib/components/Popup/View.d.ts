import React from "react";
import { ScreenPosition } from "../../types";
interface Props {
    items: string[];
    clickHandler: (_event: React.MouseEvent) => void;
    position: ScreenPosition;
}
declare const View: ({ clickHandler, items, position }: Props) => JSX.Element;
export default View;
