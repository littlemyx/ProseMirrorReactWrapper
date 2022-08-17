import { Decoration } from "prosemirror-view";
import { StateField } from "prosemirror-state";
import { SelectedRange } from "../types";
import { ScreenPosition } from "../../types";
export interface AutocompletePluginState extends StateField {
    cursorDeco: Decoration;
    docChanged: boolean;
    screenPosition: ScreenPosition | null;
    isPopupVisible: boolean;
    selectedRange: SelectedRange | null;
    clickHandler: (_correction: string) => void | null;
    candidates: string[];
}
