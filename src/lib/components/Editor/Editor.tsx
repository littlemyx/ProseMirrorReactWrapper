import "prosemirror-view/style/prosemirror.css";
import "prosemirror-menu/style/menu.css";
import "./index.css";

import React, { useRef } from "react";
import { schema } from "prosemirror-schema-basic";
import { keymap } from "prosemirror-keymap";
import { baseKeymap } from "prosemirror-commands";
import { useProseMirror, ProseMirror } from "use-prosemirror";
import { EditorState, Plugin, StateField } from "prosemirror-state";

import { menuBar } from "prosemirror-menu";

import buildMenu from "./buildMenu";

interface EditorProps {
  plugins: Plugin<StateField, any>[];
  renderPluginsViews: (_state: EditorState) => JSX.Element;
  className?: string;
}

const Editor = ({
  plugins,
  renderPluginsViews,
  className = null
}: EditorProps) => {
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
    <div className="ProseMirrorContainer">
      <ProseMirror className={className} state={state} onChange={setState} />
      {renderPluginsViews(state)}
    </div>
  );
};

export default Editor;
