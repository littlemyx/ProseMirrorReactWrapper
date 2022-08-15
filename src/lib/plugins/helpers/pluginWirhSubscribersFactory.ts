import {
  Plugin,
  Selection,
  TextSelection,
  Transaction,
  EditorState
} from "prosemirror-state";

import {
  SubscribHandler,
  SubscriberCallback,
  Subscriber,
  PluginFactory
} from "../../types";

function pluginWirhSubscribersFactory(pluginFactory: PluginFactory) {
  const subscribers: Subscriber[] = [];

  const subscribe: SubscribHandler = (callback: SubscriberCallback) => {
    const id = new Date().getTime();
    subscribers.push({ id, callback });

    return () => {
      subscribers.splice(
        subscribers.findIndex(s => s.id === id),
        1
      );
    };
  };

  const hide = () => {
    subscribers.forEach(({ callback }) => callback({ isVisible: false }));
  };

  const plugin = pluginFactory(subscribers, hide);

  return { plugin, subscribe };
}

export default pluginWirhSubscribersFactory;
