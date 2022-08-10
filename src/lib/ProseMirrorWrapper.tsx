import "prosemirror-menu/style/menu.css";

import React, { useEffect, useRef } from "react";

import { schema } from "prosemirror-schema-basic";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";

const ProseMirror = () => {
  const targetElement = useRef<null | HTMLDivElement>(null);
  const editorRef = useRef(null);

  useEffect(() => {
    const state = EditorState.create({ schema });
    editorRef.current = new EditorView(targetElement.current, { state });

    return () => {
      editorRef.current.destroy();
      editorRef.current = null; // TODO do we really need this?
    };
  }, []);

  return <div ref={targetElement} />;
};

export default ProseMirror;
