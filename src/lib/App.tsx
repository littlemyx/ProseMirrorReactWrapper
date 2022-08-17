import "./index.css";

import React, { useCallback, useRef } from "react";
import { EditorState } from "prosemirror-state";

import createSpellcheckPlugin, {
  SpellcheckerPopup
} from "./plugins/spellchecker";
import createAutocompletePlugin, {
  AutocompletePopup
} from "./plugins/autocomplete";

import Editor from "./components/Editor";

const App = () => {
  const plugins = useRef([
    createSpellcheckPlugin(),
    createAutocompletePlugin()
  ]);

  const renderPluginsViews = useCallback(
    (state: EditorState) => (
      <>
        <SpellcheckerPopup state={state} />
        <AutocompletePopup state={state} />
      </>
    ),
    []
  );

  return (
    <div className="App">
      <Editor
        className="ProseMirror"
        plugins={plugins.current}
        renderPluginsViews={renderPluginsViews}
      />
    </div>
  );
};

export default App;
