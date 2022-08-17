import { Decoration, DecorationSet } from "prosemirror-view";
import { StateField } from "prosemirror-state";
import { ScreenPosition } from "../../types";
import { SelectedRange } from "../types";
export interface Word {
    text: string;
    from: number;
    to: number;
}
export declare type Error = Word & {
    correction?: string[];
};
export interface ErrorMap {
    [key: string]: string[];
}
export interface SpellcheckerPluginState extends StateField {
    decoration: DecorationSet;
    cursorDeco: Decoration;
    docChanged: boolean;
    screenPosition: ScreenPosition | null;
    isPopupVisible: boolean;
    selectedRange: SelectedRange | null;
    clickHandler: (_correction: string) => void | null;
    errors: Word[];
    errorMap: ErrorMap;
}
