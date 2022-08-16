import { Plugin } from "prosemirror-state";
import { AutocompletePluginState } from "./types";
import "./index.css";
declare function createAutocompletePlugin(): Plugin<AutocompletePluginState, any>;
export default createAutocompletePlugin;
