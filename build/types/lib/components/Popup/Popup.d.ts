/// <reference types="react" />
import "./index.css";
import { SubscribHandler } from "../../types";
interface Props {
    subscribeToPluginChanges: SubscribHandler;
}
declare const Popup: ({ subscribeToPluginChanges }: Props) => JSX.Element;
export default Popup;
