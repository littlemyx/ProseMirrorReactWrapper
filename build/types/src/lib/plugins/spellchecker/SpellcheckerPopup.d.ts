/// <reference types="react" />
import { EditorState } from "prosemirror-state";
interface Props {
    state: EditorState;
}
declare const SpellcheckerPopup: ({ state }: Props) => JSX.Element;
export default SpellcheckerPopup;
