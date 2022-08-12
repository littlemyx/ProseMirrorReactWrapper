import { Decoration, DecorationSet } from "prosemirror-view";
import { Plugin, Transaction, EditorState } from "prosemirror-state";
interface IPluginState {
    init: (this: Plugin<IPluginState, any>, config: {
        [key: string]: any;
    }, instance: EditorState<any>) => IPluginState;
    apply: (this: Plugin<IPluginState, any>, tr: Transaction<any>, value: IPluginState, oldState: EditorState<any>, newState: EditorState<any>) => IPluginState;
    decos: DecorationSet;
    cursorDeco: Decoration;
}
declare function spellcheckPlugin(): Plugin<IPluginState, any>;
export default spellcheckPlugin;
