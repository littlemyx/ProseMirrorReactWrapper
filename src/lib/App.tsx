// import "prosemirror-view/style/prosemirror.css";
// import "prosemirror-menu/style/menu.css";

import React, { useRef } from "react";

import createSpellcheckPlugin from "./plugins/spellchecker";
import createAutocompletePlugin from "./plugins/autocomplete";

import pluginWirhSubscribersFactory from "./plugins/helpers";

import Editor from "./components/Editor";
import Popup from "./components/Popup";

import { SubscriberCallback } from "./types";

const App = () => {
  const {
    plugin: autocompletePlugin,
    subscribe: subscribeToAutocompleteEvent
  } = pluginWirhSubscribersFactory(createAutocompletePlugin);

  const { plugin: spellcheckerPlugin, subscribe: subscribeToSpellcheckEvent } =
    pluginWirhSubscribersFactory(createSpellcheckPlugin);

  const subscribeToAllPlugins = (callback: SubscriberCallback) => {
    const unsubscribeToAutocompleteEvent =
      subscribeToAutocompleteEvent(callback);
    const unsubscribeToSpellcheckEvent = subscribeToSpellcheckEvent(callback);

    return () => {
      unsubscribeToAutocompleteEvent();
      unsubscribeToSpellcheckEvent();
    };
  };

  const plugins = useRef([autocompletePlugin, spellcheckerPlugin]);

  return (
    <div className="App">
      <div className="ProseMirrorContainer">
        <Editor className="ProseMirror" plugins={plugins.current} />
      </div>
      <Popup subscribeToPluginChanges={subscribeToAllPlugins} />
    </div>
  );
};

export default App;
