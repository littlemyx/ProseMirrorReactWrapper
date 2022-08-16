import "./index.css";
import { Plugin } from "prosemirror-state";
import { Word, Error, SpellcheckerPluginState } from "./types";
import type { DataProvider } from "../dataProvider";
declare function createAutocompletePlugin(dataProvider?: DataProvider<Word[], Error[]>): Plugin<SpellcheckerPluginState, any>;
export default createAutocompletePlugin;
