import { Command, toggleMark } from "prosemirror-commands";
import { MarkType, Schema, NodeType } from "prosemirror-model";
import { EditorState } from "prosemirror-state";

import {
  blockTypeItem,
  Dropdown,
  DropdownSubmenu,
  icons,
  MenuItem,
  MenuElement,
  MenuItemSpec
} from "prosemirror-menu";

import cut from "./cut";

function cmdItem(cmd: Command, options: Partial<MenuItemSpec>) {
  const passedOptions: MenuItemSpec = {
    label: options.title as string | undefined,
    run: cmd
  };
  for (const prop in options)
    (passedOptions as any)[prop] = (options as any)[prop];
  if (!options.enable && !options.select)
    passedOptions[options.enable ? "enable" : "select"] = state => cmd(state);

  return new MenuItem(passedOptions);
}

function markActive(state: EditorState, type: MarkType) {
  const { from, $from, to, empty } = state.selection;
  if (empty) return !!type.isInSet(state.storedMarks || $from.marks());
  else return state.doc.rangeHasMark(from, to, type);
}

function markItem(markType: MarkType, options: Partial<MenuItemSpec>) {
  const passedOptions: Partial<MenuItemSpec> = {
    active(state) {
      return markActive(state, markType);
    }
  };
  for (const prop in options)
    (passedOptions as any)[prop] = (options as any)[prop];
  return cmdItem(toggleMark(markType), passedOptions);
}

type MenuItemResult = {
  /// A menu item to toggle the [strong mark](#schema-basic.StrongMark).
  toggleStrong?: MenuItem;

  /// A menu item to toggle the [emphasis mark](#schema-basic.EmMark).
  toggleEm?: MenuItem;

  /// A menu item to set the current textblock to be a normal
  /// [paragraph](#schema-basic.Paragraph).
  makeParagraph?: MenuItem;

  /// Menu items to set the current textblock to be a
  /// [heading](#schema-basic.Heading) of level _N_.
  makeHead1?: MenuItem;
  makeHead2?: MenuItem;
  makeHead3?: MenuItem;
  makeHead4?: MenuItem;
  makeHead5?: MenuItem;
  makeHead6?: MenuItem;

  /// A menu item to set the current textblock to be a
  /// [code block](#schema-basic.CodeBlock).
  makeCodeBlock?: MenuItem;

  /// Inline-markup related menu items.
  inlineMenu: MenuElement[][];

  /// A dropdown containing the items for making the current
  /// textblock a paragraph, code block, or heading.
  typeMenu: Dropdown;

  /// An array of arrays of menu elements for use as the full menu
  /// for, for example the [menu
  /// bar](https://github.com/prosemirror/prosemirror-menu#user-content-menubar).
  fullMenu: MenuElement[][];
};

/// Given a schema, look for default mark and node types in it and
/// return an object with relevant menu items relating to those marks.
function buildMenu(schema: Schema): MenuItemResult {
  const result: MenuItemResult = {} as any;
  let mark: MarkType | undefined;
  if ((mark = schema.marks.strong))
    result.toggleStrong = markItem(mark, {
      title: "Toggle strong style",
      icon: icons.strong
    });
  if ((mark = schema.marks.em))
    result.toggleEm = markItem(mark, {
      title: "Toggle emphasis",
      icon: icons.em
    });

  let node: NodeType | undefined;

  if ((node = schema.nodes.paragraph))
    result.makeParagraph = blockTypeItem(node, {
      title: "Change to paragraph",
      label: "Plain"
    });

  if ((node = schema.nodes.heading))
    for (let i = 1; i <= 10; i++)
      (result as any)["makeHead" + i] = blockTypeItem(node, {
        title: "Change to heading " + i,
        label: "Level " + i,
        attrs: { level: i }
      });

  result.typeMenu = new Dropdown(
    cut([
      result.makeParagraph,
      result.makeCodeBlock,
      result.makeHead1 &&
        new DropdownSubmenu(
          cut([
            result.makeHead1,
            result.makeHead2,
            result.makeHead3,
            result.makeHead4,
            result.makeHead5,
            result.makeHead6
          ]),
          { label: "Heading" }
        )
    ]),
    { label: "Type..." }
  );

  result.inlineMenu = [cut([result.toggleStrong, result.toggleEm])];

  result.fullMenu = result.inlineMenu.concat([[result.typeMenu]]);

  return result;
}

export default buildMenu;
