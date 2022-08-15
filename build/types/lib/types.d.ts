import { Plugin, Transaction, EditorState } from "prosemirror-state";
export declare type SubscribHandler = (callback: SubscriberCallback) => () => void;
export interface PopupState {
    isVisible: boolean;
    word?: string;
    screenPos?: ScreenPosition;
    list?: string[];
    clickHandler?: (correction: string) => void;
}
export declare type SubscriberCallback = (state: PopupState) => void;
export interface Subscriber {
    id: number;
    callback: SubscriberCallback;
}
export interface ScreenPosition {
    x: number;
    y: number;
}
export declare type PluginFactory = (subscriber: Subscriber[], hide: () => void) => Plugin<BasePluginState, any>;
export interface BasePluginState {
    init: (this: Plugin<BasePluginState, any>, config: {
        [key: string]: any;
    }, instance: EditorState<any>) => BasePluginState;
    apply: (this: Plugin<BasePluginState, any>, tr: Transaction<any>, value: BasePluginState, oldState: EditorState<any>, newState: EditorState<any>) => BasePluginState;
}
