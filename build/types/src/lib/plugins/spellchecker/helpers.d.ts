import { DecorationSet } from "prosemirror-view";
import { EditorView } from "prosemirror-view";
import { Node } from "prosemirror-model";
import { SelectedRange } from "../types";
import { Word, Error, ErrorMap } from "./types";
/**
 * Traverses the document and returns each words in the document separately with its borders.
 */
export declare function gatherAllWords(doc: Node): Word[];
/**
 *
 * Creates a map of errors for a given document.
 * Maps helps to compare the ragne in the doc with the suggested variants of replacement.
 *
 */
export declare function createErrorMap(errors: Error[]): ErrorMap;
export declare function createDecorations(errors: Word[], doc: Node): DecorationSet<any>;
/**
 *
 * Creates the function that will be used to replace the word with the correction
 *
 **/
export declare function createCorrectionFunction(view: EditorView, { from, to }: SelectedRange): (correction: string) => void;
/**
 *
 * Cheap version of debouncer. Works only for one function
 *
 * **/
export declare const debouncedCall: (callback: () => void, timeout?: number) => void;
