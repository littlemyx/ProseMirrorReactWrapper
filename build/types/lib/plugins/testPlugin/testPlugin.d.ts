import { Plugin } from "prosemirror-state";
import { BasePluginState } from "../../types";
interface State extends BasePluginState {
    changed: boolean;
}
declare const plugin: Plugin<State, any>;
export default plugin;
