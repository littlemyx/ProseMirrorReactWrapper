import { Plugin } from "prosemirror-state";
import { Subscriber, BasePluginState } from "../../types";
import { DataProvider } from "./dataProvider";
declare function createAutocompletePlugin(subscribers: Subscriber[], hide: () => void, // TODO need to change to api with generic functions,
dataProvider?: DataProvider): Plugin<BasePluginState, any>;
export default createAutocompletePlugin;
