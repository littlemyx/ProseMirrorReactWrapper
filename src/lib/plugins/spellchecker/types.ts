import { Decoration, DecorationSet } from "prosemirror-view";

import { BasePluginState, ScreenPosition } from "../../types";
import { SelectedRange } from "../types";

export interface Word {
  text: string;
  from: number;
  to: number;
}

export type Error = Word & { correction?: string[] };

export interface ErrorMap {
  [key: string]: string[];
}

export interface SpellcheckerPluginState extends BasePluginState {
  decoration: DecorationSet;
  cursorDeco: Decoration;
  docChanged: boolean;
  screenPosition: ScreenPosition | null;
  isPopupVisible: boolean;
  selectedRange: SelectedRange | null;
  clickHandler: (correction: string) => void | null;
  errors: Word[];
  errorMap: ErrorMap;
}
