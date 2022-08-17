import { Mark } from "prosemirror-model";
import { EditorView } from "prosemirror-view";
import { SelectedRange } from "../types";
import { ScreenPosition } from "../../types";
/**
 *
 * Creates the function that will be used to replace the word with the correction
 *
 **/
export declare function createCorrectionFunction(view: EditorView, { from, to }: SelectedRange, marks?: Mark[]): (correction: string) => void;
/**
 * Function to check and react on autocomplete initiation event
 * Finds the node by the position of the cursor and checks if it is a word calling a callback function after this
 */
export declare function checkPosition(view: EditorView, position: number, callback: (_word: string, _marks: Mark[], _screenPosition: ScreenPosition, _range: SelectedRange) => void): void;
