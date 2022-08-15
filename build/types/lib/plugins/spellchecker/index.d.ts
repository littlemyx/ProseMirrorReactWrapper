import { Decoration, DecorationSet } from "prosemirror-view";
import { Plugin } from "prosemirror-state";
import { Subscriber, BasePluginState } from "../../types";
import "./index.css";
interface AutocompletePlugin extends BasePluginState {
    decos: DecorationSet;
    cursorDeco: Decoration;
}
declare function createAutocompletePlugin(subscribers: Subscriber[], hide: () => void): Plugin<AutocompletePlugin, any>;
export default createAutocompletePlugin;
