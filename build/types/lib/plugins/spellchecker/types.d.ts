import { Decoration, DecorationSet } from "prosemirror-view";
import { BasePluginState, ScreenPosition } from "../../types";
export interface selectedRange {
  from: number;
  to: number;
}
export interface Word {
  text: string;
  from: number;
  to: number;
}
export interface ErrorMap {
  [key: string]: string[];
}
export interface AutocompletePluginState extends BasePluginState {
  decoration: DecorationSet;
  cursorDeco: Decoration;
  docChanged: boolean;
  screenPosition: ScreenPosition | null;
  isPopupVisible: boolean;
  selectedRange: selectedRange | null;
  errors: Word[];
  errorMap: ErrorMap;
}
