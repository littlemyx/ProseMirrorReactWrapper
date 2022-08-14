import { Plugin, Transaction, EditorState } from "prosemirror-state";
interface IPluginState {
    init: (this: Plugin<IPluginState, any>, config: {
        [key: string]: any;
    }, instance: EditorState<any>) => IPluginState;
    apply: (this: Plugin<IPluginState, any>, tr: Transaction<any>, value: IPluginState, oldState: EditorState<any>, newState: EditorState<any>) => IPluginState;
    lastWord: string;
}
declare function autocompletePlugin(): Plugin<IPluginState, any>;
export default autocompletePlugin;
