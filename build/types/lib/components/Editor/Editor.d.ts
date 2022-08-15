/// <reference types="react" />
import "prosemirror-view/style/prosemirror.css";
import "prosemirror-menu/style/menu.css";
import "./index.css";
import { Plugin } from "prosemirror-state";
import { BasePluginState } from "../../types";
interface EditorProps {
    plugins: Plugin<BasePluginState, any>[];
    className?: string;
}
declare const Editor: ({ plugins, className }: EditorProps) => JSX.Element;
export default Editor;
