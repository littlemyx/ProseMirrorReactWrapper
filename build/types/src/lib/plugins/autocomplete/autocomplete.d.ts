import { Plugin } from "prosemirror-state";
import type { DataProvider } from "../dataProvider";
import { AutocompletePluginState } from "./types";
declare function createAutocompletePlugin(dataProvider?: DataProvider<string, string[]>): Plugin<AutocompletePluginState, any>;
export default createAutocompletePlugin;
