// import "prosemirror-view/style/prosemirror.css";
// import "prosemirror-menu/style/menu.css";
import "./index.css";

import React, { PropsWithChildren } from "react";
import { schema } from "prosemirror-schema-basic";
import { keymap } from "prosemirror-keymap";
import { baseKeymap, Command, toggleMark } from "prosemirror-commands";
import { MarkType, Schema, NodeType } from "prosemirror-model";
import { history, redo, undo } from "prosemirror-history";
import { useProseMirror, ProseMirror } from "use-prosemirror";
import { NodeSelection, EditorState, Transaction } from "prosemirror-state";
import { wrapInList } from "prosemirror-schema-list";
import { exampleSetup } from "prosemirror-example-setup";
import {
  wrapItem,
  blockTypeItem,
  Dropdown,
  menuBar,
  DropdownSubmenu,
  joinUpItem,
  liftItem,
  selectParentNodeItem,
  undoItem,
  redoItem,
  icons,
  MenuItem,
  MenuElement,
  MenuItemSpec
} from "prosemirror-menu";

import Button from "./components/Button";

import cut from "./cut";

function toggleMarkCommand(mark: MarkType): Command {
  return (
    state: EditorState,
    dispatch: ((tr: Transaction) => void) | undefined
  ) => {
    return toggleMark(mark)(state, dispatch);
  };
}

const toggleBold = toggleMarkCommand(schema.marks.strong);

const toggleItalic = toggleMarkCommand(schema.marks.em);

const toggleHeading = toggleMarkCommand(schema.marks.heading);

function isBold(state: EditorState): boolean {
  return isMarkActive(state, schema.marks.strong);
}

function isItalic(state: EditorState): boolean {
  return isMarkActive(state, schema.marks.em);
}

function isHeader(state: EditorState): boolean {
  console.log(schema);
  return isMarkActive(state, schema.marks.heading);
}

// https://github.com/ProseMirror/prosemirror-example-setup/blob/afbc42a68803a57af3f29dd93c3c522c30ea3ed6/src/menu.js#L57-L61
function isMarkActive(state: EditorState, mark: MarkType): boolean {
  const { from, $from, to, empty } = state.selection;
  return empty
    ? !!mark.isInSet(state.storedMarks || $from.marks())
    : state.doc.rangeHasMark(from, to, mark);
}

function cmdItem(cmd: Command, options: Partial<MenuItemSpec>) {
  let passedOptions: MenuItemSpec = {
    label: options.title as string | undefined,
    run: cmd
  };
  for (let prop in options)
    (passedOptions as any)[prop] = (options as any)[prop];
  if (!options.enable && !options.select)
    passedOptions[options.enable ? "enable" : "select"] = state => cmd(state);

  return new MenuItem(passedOptions);
}

function markActive(state: EditorState, type: MarkType) {
  let { from, $from, to, empty } = state.selection;
  if (empty) return !!type.isInSet(state.storedMarks || $from.marks());
  else return state.doc.rangeHasMark(from, to, type);
}

function markItem(markType: MarkType, options: Partial<MenuItemSpec>) {
  let passedOptions: Partial<MenuItemSpec> = {
    active(state) {
      return markActive(state, markType);
    }
  };
  for (let prop in options)
    (passedOptions as any)[prop] = (options as any)[prop];
  return cmdItem(toggleMark(markType), passedOptions);
}

function canInsert(state: EditorState, nodeType: NodeType) {
  let $from = state.selection.$from;
  for (let d = $from.depth; d >= 0; d--) {
    let index = $from.index(d);
    if ($from.node(d).canReplaceWith(index, index, nodeType)) return true;
  }
  return false;
}

function insertImageItem(nodeType: NodeType) {
  return new MenuItem({
    title: "Insert image",
    label: "Image",
    enable(state) {
      return canInsert(state, nodeType);
    },
    run(state, _, view) {
      let { from, to } = state.selection,
        attrs = null;
      if (
        state.selection instanceof NodeSelection &&
        state.selection.node.type == nodeType
      )
        attrs = state.selection.node.attrs;
    }
  });
}

function linkItem(markType: MarkType) {
  return new MenuItem({
    title: "Add or remove link",
    icon: icons.link,
    active(state) {
      return markActive(state, markType);
    },
    enable(state) {
      return !state.selection.empty;
    },
    run(state, dispatch, view) {
      if (markActive(state, markType)) {
        toggleMark(markType)(state, dispatch);
        return true;
      }
    }
  });
}

function wrapListItem(nodeType: NodeType, options: Partial<MenuItemSpec>) {
  return cmdItem(wrapInList(nodeType, (options as any).attrs), options);
}

type MenuItemResult = {
  /// A menu item to toggle the [strong mark](#schema-basic.StrongMark).
  toggleStrong?: MenuItem;

  /// A menu item to toggle the [emphasis mark](#schema-basic.EmMark).
  toggleEm?: MenuItem;

  /// A menu item to toggle the [code font mark](#schema-basic.CodeMark).
  toggleCode?: MenuItem;

  /// A menu item to toggle the [link mark](#schema-basic.LinkMark).
  toggleLink?: MenuItem;

  /// A menu item to insert an [image](#schema-basic.Image).
  insertImage?: MenuItem;

  /// A menu item to wrap the selection in a [bullet list](#schema-list.BulletList).
  wrapBulletList?: MenuItem;

  /// A menu item to wrap the selection in an [ordered list](#schema-list.OrderedList).
  wrapOrderedList?: MenuItem;

  /// A menu item to wrap the selection in a [block quote](#schema-basic.BlockQuote).
  wrapBlockQuote?: MenuItem;

  /// A menu item to set the current textblock to be a normal
  /// [paragraph](#schema-basic.Paragraph).
  makeParagraph?: MenuItem;

  /// A menu item to set the current textblock to be a
  /// [code block](#schema-basic.CodeBlock).
  makeCodeBlock?: MenuItem;

  /// Menu items to set the current textblock to be a
  /// [heading](#schema-basic.Heading) of level _N_.
  makeHead1?: MenuItem;
  makeHead2?: MenuItem;
  makeHead3?: MenuItem;
  makeHead4?: MenuItem;
  makeHead5?: MenuItem;
  makeHead6?: MenuItem;

  /// A menu item to insert a horizontal rule.
  insertHorizontalRule?: MenuItem;

  /// A dropdown containing the `insertImage` and
  /// `insertHorizontalRule` items.
  insertMenu: Dropdown;

  /// A dropdown containing the items for making the current
  /// textblock a paragraph, code block, or heading.
  typeMenu: Dropdown;

  /// Array of block-related menu items.
  blockMenu: MenuElement[][];

  /// Inline-markup related menu items.
  inlineMenu: MenuElement[][];

  /// An array of arrays of menu elements for use as the full menu
  /// for, for example the [menu
  /// bar](https://github.com/prosemirror/prosemirror-menu#user-content-menubar).
  fullMenu: MenuElement[][];
};

/// Given a schema, look for default mark and node types in it and
/// return an object with relevant menu items relating to those marks.
export function buildMenuItems(schema: Schema): MenuItemResult {
  const r: MenuItemResult = {} as any;
  let mark: MarkType | undefined;
  if ((mark = schema.marks.strong))
    r.toggleStrong = markItem(mark, {
      title: "Toggle strong style",
      icon: icons.strong
    });
  if ((mark = schema.marks.em))
    r.toggleEm = markItem(mark, { title: "Toggle emphasis", icon: icons.em });

  let node: NodeType | undefined;

  if ((node = schema.nodes.paragraph))
    r.makeParagraph = blockTypeItem(node, {
      title: "Change to paragraph",
      label: "Plain"
    });

  if ((node = schema.nodes.heading))
    for (let i = 1; i <= 10; i++)
      (r as any)["makeHead" + i] = blockTypeItem(node, {
        title: "Change to heading " + i,
        label: "Level " + i,
        attrs: { level: i }
      });

  r.typeMenu = new Dropdown(
    cut([
      r.makeParagraph,
      r.makeCodeBlock,
      r.makeHead1 &&
        new DropdownSubmenu(
          cut([
            r.makeHead1,
            r.makeHead2,
            r.makeHead3,
            r.makeHead4,
            r.makeHead5,
            r.makeHead6
          ]),
          { label: "Heading" }
        )
    ]),
    { label: "Type..." }
  );

  r.inlineMenu = [cut([r.toggleStrong, r.toggleEm])];

  r.fullMenu = r.inlineMenu.concat([[r.typeMenu]], [[undoItem, redoItem]]);

  return r;
}

const mySchema = new Schema({
  nodes: {
    doc: schema.nodes.doc,
    paragraph: schema.nodes.paragraph,
    heading: schema.nodes.heading,
    text: schema.nodes.text
  },
  marks: schema.spec.marks
});

const opts: Parameters<typeof useProseMirror>[0] = {
  schema: schema,
  // plugins: exampleSetup({ schema: mySchema })
  plugins: [
    menuBar({
      floating: true,
      content: buildMenuItems(schema).fullMenu
    }),

    history(),
    keymap({
      ...baseKeymap,
      "Mod-z": undo,
      "Mod-y": redo,
      "Mod-Shift-z": redo,
      "Mod-b": toggleBold,
      "Mod-i": toggleItalic
    })
  ]
};

const App = () => {
  const [state, setState] = useProseMirror(opts);

  return (
    <div className="App">
      <div className="ProseMirrorContainer">
        <ProseMirror
          className="ProseMirror"
          state={state}
          onChange={setState}
        />
      </div>
    </div>
  );
};

export default App;
