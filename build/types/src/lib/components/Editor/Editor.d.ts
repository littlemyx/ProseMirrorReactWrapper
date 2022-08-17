/// <reference types="react" />
import "prosemirror-view/style/prosemirror.css";
import "prosemirror-menu/style/menu.css";
import "./index.css";
import { Plugin, StateField } from "prosemirror-state";
interface EditorProps {
    plugins: Plugin<StateField, any>[];
    className?: string;
}
declare const Editor: ({ plugins, className }: EditorProps) => JSX.Element;
export default Editor;
