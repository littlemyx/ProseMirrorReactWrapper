import "prosemirror-menu/style/menu.css";

import React, { useEffect, useRef } from "react";

import { schema } from "prosemirror-schema-basic";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { undo, redo, history } from "prosemirror-history";
import { keymap } from "prosemirror-keymap";
import { baseKeymap } from "prosemirror-commands";
import { Schema } from "prosemirror-model";

const ProseMirror = () => {
  const targetElement = useRef<null | HTMLDivElement>(null);
  const editorRef = useRef(null);

  useEffect(() => {
    const state = EditorState.create({
      // schema,
      schema: new Schema({
        nodes: {
          doc: { content: "paragraph*" },
          // doc: { content: "text*" },
          paragraph: { group: "block", content: "text*", marks: "strong" },
          text: { inline: true }
        },
        marks: {
          strong: {},
          em: {}
        }
      }),
      doc: schema.node("doc", null, [
        // schema.node("text", null, [schema.text("One.")])
        // schema.node("paragraph", null, [schema.text("One.")]),
        schema.node("paragraph", null, [
          schema.text("test", [schema.mark("em")])
        ])
        // schema.node("horizontal_rule"),
        // schema.node("paragraph", null, [schema.text("Two!")])
      ]),
      plugins: [
        history(),
        keymap({ "Mod-z": undo, "Mod-y": redo }),
        keymap(baseKeymap)
      ]
    });

    editorRef.current = new EditorView(targetElement.current, {
      state,
      dispatchTransaction(transaction) {
        console.log(
          "Document size went from",
          transaction.before.content.size,
          "to",
          transaction.doc.content.size
        );
        console.log(transaction);
        const newState = editorRef.current.state.apply(transaction);
        editorRef.current.updateState(newState);
      }
    });

    return () => {
      editorRef.current.destroy();
      editorRef.current = null; // TODO do we really need this?
    };
  }, []);

  return <div ref={targetElement} />;
};

export default ProseMirror;
