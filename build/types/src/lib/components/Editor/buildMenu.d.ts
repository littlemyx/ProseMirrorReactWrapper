import { Schema } from "prosemirror-model";
import { Dropdown, MenuItem, MenuElement } from "prosemirror-menu";
declare type MenuItemResult = {
    toggleStrong?: MenuItem;
    toggleEm?: MenuItem;
    makeParagraph?: MenuItem;
    makeHead1?: MenuItem;
    makeHead2?: MenuItem;
    makeHead3?: MenuItem;
    makeHead4?: MenuItem;
    makeHead5?: MenuItem;
    makeHead6?: MenuItem;
    makeCodeBlock?: MenuItem;
    inlineMenu: MenuElement[][];
    typeMenu: Dropdown;
    fullMenu: MenuElement[][];
};
declare function buildMenu(schema: Schema): MenuItemResult;
export default buildMenu;
