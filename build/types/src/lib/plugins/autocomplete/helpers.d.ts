import { Mark } from "prosemirror-model";
import { EditorView } from "prosemirror-view";
import { SelectedRange } from "../types";
import { ScreenPosition } from "../../types";
export declare function createCorrectionFunction(view: EditorView, { from, to }: SelectedRange, marks?: Mark[]): (correction: string) => void;
export declare function checkPosition(view: EditorView, position: number, callback: (_word: string, _marks: Mark[], _screenPosition: ScreenPosition, _range: SelectedRange) => void): void;
