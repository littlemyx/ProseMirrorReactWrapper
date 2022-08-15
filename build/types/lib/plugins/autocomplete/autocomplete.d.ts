import { Plugin } from "prosemirror-state";
import { Subscriber, BasePluginState } from "../../types";
declare function createAutocompletePlugin(subscribers: Subscriber[], hide: () => void): Plugin<BasePluginState, any>;
export default createAutocompletePlugin;
