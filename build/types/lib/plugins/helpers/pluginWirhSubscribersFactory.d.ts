import { Plugin } from "prosemirror-state";
import { SubscribHandler, PluginFactory } from "../../types";
declare function pluginWirhSubscribersFactory(pluginFactory: PluginFactory): {
    plugin: Plugin<import("../../types").BasePluginState, any>;
    subscribe: SubscribHandler;
};
export default pluginWirhSubscribersFactory;
