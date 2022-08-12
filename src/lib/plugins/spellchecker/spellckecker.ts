/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Decoration, DecorationSet } from "prosemirror-view";
import {
  Plugin,
  TextSelection,
  Transaction,
  EditorState
} from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { ReplaceStep } from "prosemirror-transform";

const FINISH = "FINISH";

const DICTIONARY_EXP = {
  c: { ca: { cat: FINISH, car: { car: FINISH, card: FINISH } } },
  b: { ba: { bar: FINISH, bat: FINISH }, bu: { bus: FINISH, but: FINISH } }
};

const DICT = [
  "cat",
  "card",
  "dog",
  "dorf",
  "donkey",
  "rabbit",
  "random",
  "giraffi",
  "giant",
  "horse",
  "horde",
  "honey",
  "zebra",
  "zero",
  "zena"
];

const suggester = (token: string) => {
  const result = new Set<string>();
  const dict = [...DICT];
  for (let i = 1; i < token.length; i++) {
    const char = token.slice(0, i);
    const words = dict.filter(d => d.startsWith(char));
    words.forEach(word => {
      if (word.length > token.length - 2 && word.length < token.length + 2)
        result.add(word);
    });
  }

  return Array.from(result);
};

const typo = {
  ignore: (token: string): void => {
    return null;
  },
  suggest: (
    arg?: any,
    arg2?: any,
    callback1?: () => void,
    callback2?: (arg: any) => void
  ): void => {},
  check: (value: string): boolean => {
    return DICT.includes(value);
  }
};

function addCSSclass(rules: any[]) {
  const style = document.createElement("style");
  style.appendChild(document.createTextNode("")); // WebKit hack :(
  document.head.appendChild(style);
  const sheet = style.sheet as CSSStyleSheet;

  rules.forEach((rule, index) => {
    try {
      if ("insertRule" in sheet) {
        sheet.insertRule(rule.selector + "{" + rule.rule + "}", index);
      } else {
        throw new Error("Can't add CSS rules");
      }
    } catch (e) {
      console.error(e);
    }
  });
}

function getSbox() {
  // create suggestions widget
  let sbox = document.getElementById("suggestBox");
  if (sbox) return sbox;

  addCSSclass([
    {
      selector: ".spell-error",
      rule: 'background-image: url("data:image/gif;base64,R0lGODlhBAADAIABAP8AAP///yH5BAEAAAEALAAAAAAEAAMAAAIFRB5mGQUAOw=="); background-position: bottom; background-repeat: repeat-x;'
    },
    {
      selector: "#suggestBox",
      rule: "display:inline-block; overflow:hidden; border:solid black 1px;"
    },
    {
      selector: "#suggestBox > select",
      rule: "padding:10px; margin:-5px -20px -5px -5px;"
    },
    {
      selector: "#suggestBox > select > option:hover",
      rule: "box-shadow: 0 0 10px 100px #4A8CF7 inset; color: white;"
    }
  ]);

  sbox = document.createElement("div");
  sbox.style.zIndex = "100000";
  sbox.id = "suggestBox";
  sbox.style.position = "fixed";
  sboxHide(sbox);

  const selwidget = document.createElement("select");
  selwidget.multiple = true;
  sbox.appendChild(selwidget);

  /*sbox.onmouseout = (e => {
		let related = (e.relatedTarget ? e.relatedTarget.tagName : null);
		console.log(related)
		if (related !== 'SELECT' && related !== 'OPTION') sboxHide(sbox)
	});*/

  document.body.appendChild(sbox);
  return sbox;
}

function sboxShow(
  sbox: HTMLElement,
  viewDom: Element,
  token: any,
  screenPos: { x: string | number; y: string | number },
  items: any[],
  hourglass: boolean,
  correctFunc: (correction: string) => void
) {
  let selwidget = sbox.children[0];

  const isSafari =
    navigator.vendor &&
    navigator.vendor.indexOf("Apple") > -1 &&
    navigator.userAgent &&
    !navigator.userAgent.match("CriOS");
  const separator = !isSafari && (hourglass || items.length > 0); // separator line does not work well on safari

  let options = "";
  items.forEach(
    s => (options += '<option value="' + s + '">' + s + "</option>")
  );
  if (hourglass)
    options += '<option disabled="disabled">&nbsp;&nbsp;&nbsp;&#8987;</option>';
  if (separator)
    options +=
      '<option style="min-height:1px; max-height:1px; padding:0; background-color: #000000;" disabled>&nbsp;</option>';
  options += '<option value="##ignoreall##">Ignore&nbsp;All</option>';

  const indexInParent = [].slice
    .call(selwidget.parentElement.children)
    .indexOf(selwidget);
  selwidget.innerHTML = options;
  selwidget = selwidget.parentElement.children[indexInParent];

  const fontSize = window
    .getComputedStyle(viewDom, null)
    .getPropertyValue("font-size");
  // @ts-ignore
  selwidget.style.fontSize = fontSize;
  // @ts-ignore
  selwidget.size = selwidget.length;
  // @ts-ignore
  if (separator) selwidget.size--;
  // @ts-ignore
  selwidget.value = -1;

  // position widget
  let viewrect = viewDom.getBoundingClientRect();
  let widgetRect = sbox.getBoundingClientRect();
  if (
    Number(screenPos.x) + widgetRect.width > viewrect.right &&
    viewrect.right - widgetRect.width > viewrect.left
  )
    screenPos.x = viewrect.right - widgetRect.width - 2;
  if (
    Number(screenPos.y) + widgetRect.height > viewrect.bottom &&
    viewrect.bottom - sbox.offsetHeight > viewrect.top
  )
    screenPos.y = viewrect.bottom - sbox.offsetHeight - 8;

  sbox.style.left = screenPos.x + "px";
  sbox.style.top = screenPos.y + "px";
  sbox.focus();
  // @ts-ignore
  selwidget.onchange = (event: KeyboardEvent) => {
    sboxHide(sbox);
    let correction = (event.target as HTMLInputElement).value;
    if (correction == "##ignoreall##") {
      typo.ignore(token);
      correction = token;
    }
    correctFunc(correction);
  };
}

function sboxHide(sbox: HTMLElement) {
  sbox.style.top = sbox.style.left = "-1000px";
  typo.suggest(); // disable any running suggeations search
}

function getRangeFromTransform(tr: Transaction) {
  let trFrom, trTo;
  for (let i = 0; i < tr.steps.length; i++) {
    const step = tr.steps[i] as ReplaceStep;
    const map = step.getMap();
    const stepFrom = map.map(step.from, -1);
    const stepTo = map.map(step.to, 1);
    trFrom = trFrom ? map.map(trFrom, -1) : stepFrom;
    trTo = trTo ? map.map(trTo, 1) : stepTo;
  }
  return {
    trFrom,
    trTo
  };
}

function createCorrectionFunction(view: EditorView, deco: Decoration) {
  return (correction: string) => {
    let tr = view.state.tr.replaceWith(
      deco.from,
      deco.to,
      view.state.schema.text(correction)
    );
    let $newPos = tr.doc.resolve(tr.mapping.map(deco.from + correction.length));
    tr = tr.setSelection(new TextSelection($newPos, $newPos));
    view.dispatch(tr);
    view.focus();
  };
}

interface IEditorState {
  doc: Node;
}

interface IPluginState {
  init: (
    this: Plugin<IPluginState, any>,
    config: { [key: string]: any },
    instance: EditorState<any>
  ) => IPluginState;
  apply: (
    this: Plugin<IPluginState, any>,
    tr: Transaction<any>,
    value: IPluginState,
    oldState: EditorState<any>,
    newState: EditorState<any>
  ) => IPluginState;
  decos: DecorationSet;
  cursorDeco: Decoration;
}

function spellcheckPlugin() {
  getSbox(); // create suggestion box

  return new Plugin<IPluginState>({
    view(view) {
      view.dom.spellcheck = false;
      return {};
    },

    state: {
      init() {
        return {
          decos: DecorationSet.empty,
          cursorDeco: null,
          ...this.spec.state
        };
      },
      apply(tr, prev, oldState, state) {
        console.log("apply was called");
        sboxHide(getSbox());

        let { decos, cursorDeco }: { decos: DecorationSet; cursorDeco: any } =
          this.getState(oldState);
        decos = decos.map(tr.mapping, tr.doc);

        if (cursorDeco) {
          decos = decos.add(state.doc, [cursorDeco]);
          cursorDeco = null;
        }

        if (!tr.selection.empty || !tr.docChanged)
          return {
            decos,
            cursorDeco,
            ...this.spec.state
          };

        const { trFrom, trTo } = getRangeFromTransform(tr);
        if (!trFrom || !trTo)
          return {
            decos,
            cursorDeco,
            ...this.spec.state
          };

        const $t = state.doc.resolve(trTo);
        const txtFrom = $t.start();
        const txtTo = $t.end();

        const txt = state.doc.textBetween(txtFrom, txtTo, " ");
        const reg = /\w+/g;
        let match = null;
        while ((match = reg.exec(txt)) != null) {
          const token = match[0];
          const tokenFrom = match.index;
          const tokenTo = reg.lastIndex;
          if (tokenTo < trFrom && tokenFrom > trTo) continue;
          decos = decos.remove(
            decos.find(txtFrom + tokenFrom, txtFrom + tokenTo)
          );

          if (!typo.check(match[0])) {
            const deco = Decoration.inline(
              txtFrom + tokenFrom,
              txtFrom + tokenTo,
              {
                class: "spell-error"
              }
            );
            if ($t.pos == txtFrom + tokenTo) {
              cursorDeco = deco;
            } else {
              decos = decos.add(state.doc, [deco]);
            }
          }
        }

        return {
          decos,
          cursorDeco,
          ...this.spec.state
        }; //: decos.map(tr.mapping, tr.doc), cursorDeco }
      }
    },
    props: {
      decorations(state: EditorState) {
        const { decos } = this.getState(state);
        return decos;
      },
      handleClick(view: EditorView, pos: number, event: MouseEvent) {
        // click(view: EditorView, event: MouseEvent) {
        const { decos } = this.getState(view.state);
        const deco = decos.find(pos, pos)[0];
        if (!deco) return;

        const $f = view.state.doc.resolve(deco.from),
          $t = view.state.doc.resolve(deco.to);
        let token = $f.parent.textBetween(
          deco.from - $f.start(),
          deco.to - $f.start(),
          " "
        );
        if (!token) return; // sanity

        const viewDom = view.dom;
        const coords = view.coordsAtPos(pos);
        const screenPos = {
          x: event.pageX,
          y: coords.bottom - 4
        };

        let sbox = getSbox();

        const results: string[] = suggester(token);

        sboxShow(
          sbox,
          view.dom,
          token,
          screenPos,
          results,
          false,
          createCorrectionFunction(view, deco)
        );

        event.preventDefault();
        return true;
      }

      // handleContextMenu(view, pos, e) {
      //   if (!window.typo) return;
      //   let { decos } = this.getState(view.state);
      //   let deco = decos.find(pos, pos)[0];
      //   if (!deco) return;

      //   const $f = view.state.doc.resolve(deco.from),
      //     $t = view.state.doc.resolve(deco.to);
      //   let token = $f.parent.textBetween(
      //     deco.from - $f.start(),
      //     deco.to - $f.start(),
      //     " "
      //   );
      //   if (!token) return; // sanity
      //   console.log(token);

      //   let viewDom = view.dom;
      //   let coords = view.coordsAtPos(pos);
      //   screenPos = {
      //     x: e.pageX,
      //     y: coords.bottom - 4
      //   };

      //   function correct(correction) {
      //     let tr = view.state.tr.replaceWith(
      //       deco.from,
      //       deco.to,
      //       view.state.schema.text(correction)
      //     );
      //     let $newPos = tr.doc.resolve(
      //       tr.mapping.map(deco.from + correction.length)
      //     );
      //     tr = tr.setSelection(new TextSelection($newPos, $newPos));
      //     view.dispatch(tr);
      //     view.focus();
      //   }

      //   let sbox = getSbox();
      //   sboxShow(sbox, view.dom, token, screenPos, [], true, correct);

      //   const results = [];
      //   // async
      //   window.typo.suggest(
      //     token,
      //     null,
      //     all => {
      //       //console.log('done');
      //       sboxShow(sbox, view.dom, token, screenPos, results, false, correct);
      //     },
      //     next => {
      //       //console.log('found '+next);
      //       results.push(next);
      //       sboxShow(sbox, view.dom, token, screenPos, results, true, correct);
      //     }
      //   );

      //   e.preventDefault();
      //   return false;
      // }
    }
  });
}

export default spellcheckPlugin;
