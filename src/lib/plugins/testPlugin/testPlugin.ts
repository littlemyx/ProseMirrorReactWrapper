import { Mark } from "prosemirror-model";
import { Plugin, Selection, TextSelection, PluginKey } from "prosemirror-state";

import { Subscriber, ScreenPosition, BasePluginState } from "../../types";

interface State extends BasePluginState {
  changed: boolean;
}

const plugin = new Plugin<State>({
  key: new PluginKey("test-plugin"),
  view(editor) {
    const pluginKey = this.key;
    return {
      update(editor, oldState) {
        const nextPluginState = pluginKey.getState(editor.state);
        console.log("pluginNextState", nextPluginState);
        // console.log("view update called with state second", second);
        if (nextPluginState.changed) {
          setTimeout(() => {
            editor.dispatch(
              editor.state.tr.setMeta("syntaxhighlight", { data: "somedata" })
            );
          }, 5000);
        }
      }
    };
  },
  state: {
    init() {
      return {
        ...this.spec.state,
        changed: false
      };
    },
    apply(tr, prev, oldState, state) {
      console.log(tr);
      return { ...prev, changed: tr.docChanged };
    }
  },
  props: {}
});

export default plugin;
