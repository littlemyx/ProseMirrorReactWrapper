import { Decoration } from "prosemirror-view";
import { SelectedRange } from "../types";
import { BasePluginState, ScreenPosition } from "../../types";
export interface AutocompletePluginState extends BasePluginState {
    cursorDeco: Decoration;
    docChanged: boolean;
    screenPosition: ScreenPosition | null;
    isPopupVisible: boolean;
    selectedRange: SelectedRange | null;
    clickHandler: (correction: string) => void | null;
    candidates: string[];
}
