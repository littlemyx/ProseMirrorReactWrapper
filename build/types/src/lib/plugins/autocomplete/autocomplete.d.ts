import { Plugin } from "prosemirror-state";
import { AutocompletePluginState } from "./types";
import type { DataProvider } from "../dataProvider";
declare function createAutocompletePlugin(dataProvider?: DataProvider<string, string[]>): Plugin<AutocompletePluginState, any>;
export default createAutocompletePlugin;
