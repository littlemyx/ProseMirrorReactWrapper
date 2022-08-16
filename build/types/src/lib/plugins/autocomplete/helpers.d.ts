import { Mark } from "prosemirror-model";
import { EditorView } from "prosemirror-view";
import { SelectedRange } from "../types";
export declare function createCorrectionFunction(view: EditorView, { from, to }: SelectedRange, mark?: Mark): (correction: string) => void;
