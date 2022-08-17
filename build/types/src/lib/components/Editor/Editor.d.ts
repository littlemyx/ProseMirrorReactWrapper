/// <reference types="react" />
import "prosemirror-view/style/prosemirror.css";
import "prosemirror-menu/style/menu.css";
import "./index.css";
import { EditorState, Plugin, StateField } from "prosemirror-state";
interface EditorProps {
    plugins: Plugin<StateField, any>[];
    renderPluginsViews: (_state: EditorState) => JSX.Element;
    className?: string;
}
declare const Editor: ({ plugins, renderPluginsViews, className }: EditorProps) => JSX.Element;
export default Editor;
