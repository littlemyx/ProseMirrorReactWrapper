import { Plugin, Transaction, EditorState } from "prosemirror-state";

export interface SelectedRange {
  from: number;
  to: number;
}

export interface BasePluginState {
  init: (
    this: Plugin<BasePluginState, any>,
    config: { [key: string]: any },
    instance: EditorState<any>
  ) => BasePluginState;
  apply: (
    this: Plugin<BasePluginState, any>,
    tr: Transaction<any>,
    value: BasePluginState,
    oldState: EditorState<any>,
    newState: EditorState<any>
  ) => BasePluginState;
}
