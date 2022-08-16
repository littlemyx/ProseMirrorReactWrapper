import { Decoration, DecorationSet } from "prosemirror-view";

import { BasePluginState, SelectedRange } from "../types";
import { ScreenPosition } from "../../types";

export interface AutocompletePluginState extends BasePluginState {
  cursorDeco: Decoration;
  docChanged: boolean;
  screenPosition: ScreenPosition | null;
  isPopupVisible: boolean;
  selectedRange: SelectedRange | null;
  clickHandler: (correction: string) => void | null;
  candidates: string[];
}
