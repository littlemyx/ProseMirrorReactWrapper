/// <reference types="react" />
import "./index.css";
import { ScreenPosition } from "../../types";
interface Props {
    isVisible: boolean;
    items: string[];
    screenPosition: ScreenPosition;
    clickHandler: (correction: string) => void;
}
declare const Popup: ({ isVisible, screenPosition, items, clickHandler: clickHandlerProp }: Props) => JSX.Element;
export default Popup;
