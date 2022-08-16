import React, { useRef } from "react";

import createSpellcheckPlugin from "./plugins/spellchecker";
import createAutocompletePlugin from "./plugins/autocomplete";

import Editor from "./components/Editor";

const App = () => {
  const plugins = useRef([
    createSpellcheckPlugin(),
    createAutocompletePlugin()
  ]);

  return (
    <div className="App">
      <Editor className="ProseMirror" plugins={plugins.current} />
    </div>
  );
};

export default App;
