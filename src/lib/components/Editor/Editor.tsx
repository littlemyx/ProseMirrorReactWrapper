import "prosemirror-view/style/prosemirror.css";
import "prosemirror-menu/style/menu.css";
import "./index.css";

import React, { useRef } from "react";
import { schema } from "prosemirror-schema-basic";
import { keymap } from "prosemirror-keymap";
import { baseKeymap } from "prosemirror-commands";
import { useProseMirror, ProseMirror } from "use-prosemirror";
import { Plugin } from "prosemirror-state";

import { menuBar } from "prosemirror-menu";

import { BasePluginState } from "../../types";

import buildMenu from "./buildMenu";

interface EditorProps {
  plugins: Plugin<BasePluginState, any>[];
  className?: string;
}

const Editor = ({ plugins, className = null }: EditorProps) => {
  const opts = useRef<Parameters<typeof useProseMirror>[0]>({
    schema: schema,
    plugins: [
      menuBar({
        floating: true,
        content: buildMenu(schema).fullMenu
      }),
      ...plugins,

      keymap({
        ...baseKeymap
      })
    ]
  });

  const [state, setState] = useProseMirror(opts.current);

  return (
    <ProseMirror className={className} state={state} onChange={setState} />
  );
};

export default Editor;
