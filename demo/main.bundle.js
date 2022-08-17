/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/demo/index.tsx":
/*!****************************!*\
  !*** ./src/demo/index.tsx ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var _lib_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../lib/index */ "./src/lib/index.tsx");

 // import "./styles/styles.scss";
// import "./styles/pagination.scss";


var root = document.getElementById("react-root");
react_dom__WEBPACK_IMPORTED_MODULE_1__.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_lib_index__WEBPACK_IMPORTED_MODULE_2__["default"], null)), root);

if (false) {}

/***/ }),

/***/ "./src/lib/App.tsx":
/*!*************************!*\
  !*** ./src/lib/App.tsx ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.css */ "./src/lib/index.css");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _plugins_spellchecker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./plugins/spellchecker */ "./src/lib/plugins/spellchecker/index.ts");
/* harmony import */ var _plugins_autocomplete__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./plugins/autocomplete */ "./src/lib/plugins/autocomplete/index.ts");
/* harmony import */ var _components_Editor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/Editor */ "./src/lib/components/Editor/index.ts");






var App = function App() {
  var plugins = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)([(0,_plugins_spellchecker__WEBPACK_IMPORTED_MODULE_2__["default"])(), (0,_plugins_autocomplete__WEBPACK_IMPORTED_MODULE_3__["default"])()]);
  var renderPluginsViews = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(function (state) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_plugins_spellchecker__WEBPACK_IMPORTED_MODULE_2__.SpellcheckerPopup, {
      state: state
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_plugins_autocomplete__WEBPACK_IMPORTED_MODULE_3__.AutocompletePopup, {
      state: state
    }));
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: "App"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_components_Editor__WEBPACK_IMPORTED_MODULE_4__["default"], {
    className: "ProseMirror",
    plugins: plugins.current,
    renderPluginsViews: renderPluginsViews
  }));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);

/***/ }),

/***/ "./src/lib/components/Editor/Editor.tsx":
/*!**********************************************!*\
  !*** ./src/lib/components/Editor/Editor.tsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var prosemirror_view_style_prosemirror_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prosemirror-view/style/prosemirror.css */ "./node_modules/prosemirror-view/style/prosemirror.css");
/* harmony import */ var prosemirror_menu_style_menu_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prosemirror-menu/style/menu.css */ "./node_modules/prosemirror-menu/style/menu.css");
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.css */ "./src/lib/components/Editor/index.css");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var prosemirror_schema_basic__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prosemirror-schema-basic */ "./node_modules/prosemirror-schema-basic/dist/index.es.js");
/* harmony import */ var prosemirror_keymap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! prosemirror-keymap */ "./node_modules/prosemirror-keymap/dist/index.es.js");
/* harmony import */ var prosemirror_commands__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prosemirror-commands */ "./node_modules/prosemirror-commands/dist/index.es.js");
/* harmony import */ var use_prosemirror__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! use-prosemirror */ "./node_modules/use-prosemirror/dist/index.js");
/* harmony import */ var use_prosemirror__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(use_prosemirror__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var prosemirror_menu__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! prosemirror-menu */ "./node_modules/prosemirror-menu/dist/index.js");
/* harmony import */ var _buildMenu__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./buildMenu */ "./src/lib/components/Editor/buildMenu.ts");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }












var Editor = function Editor(_ref) {
  var plugins = _ref.plugins,
      renderPluginsViews = _ref.renderPluginsViews,
      _ref$className = _ref.className,
      className = _ref$className === void 0 ? null : _ref$className;
  var opts = (0,react__WEBPACK_IMPORTED_MODULE_3__.useRef)({
    schema: prosemirror_schema_basic__WEBPACK_IMPORTED_MODULE_4__.schema,
    plugins: [(0,prosemirror_menu__WEBPACK_IMPORTED_MODULE_9__.menuBar)({
      floating: true,
      content: (0,_buildMenu__WEBPACK_IMPORTED_MODULE_8__["default"])(prosemirror_schema_basic__WEBPACK_IMPORTED_MODULE_4__.schema).fullMenu
    })].concat(_toConsumableArray(plugins), [(0,prosemirror_keymap__WEBPACK_IMPORTED_MODULE_5__.keymap)(_objectSpread({}, prosemirror_commands__WEBPACK_IMPORTED_MODULE_6__.baseKeymap))])
  });

  var _useProseMirror = (0,use_prosemirror__WEBPACK_IMPORTED_MODULE_7__.useProseMirror)(opts.current),
      _useProseMirror2 = _slicedToArray(_useProseMirror, 2),
      state = _useProseMirror2[0],
      setState = _useProseMirror2[1];

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", {
    className: "ProseMirrorContainer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(use_prosemirror__WEBPACK_IMPORTED_MODULE_7__.ProseMirror, {
    className: className,
    state: state,
    onChange: setState
  }), renderPluginsViews(state));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Editor);

/***/ }),

/***/ "./src/lib/components/Editor/buildMenu.ts":
/*!************************************************!*\
  !*** ./src/lib/components/Editor/buildMenu.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var prosemirror_commands__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prosemirror-commands */ "./node_modules/prosemirror-commands/dist/index.es.js");
/* harmony import */ var prosemirror_menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prosemirror-menu */ "./node_modules/prosemirror-menu/dist/index.js");
/* harmony import */ var _cut__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cut */ "./src/lib/components/Editor/cut.ts");




function cmdItem(cmd, options) {
  var passedOptions = {
    label: options.title,
    run: cmd
  };

  for (var prop in options) {
    passedOptions[prop] = options[prop];
  }

  if (!options.enable && !options.select) passedOptions[options.enable ? "enable" : "select"] = function (state) {
    return cmd(state);
  };
  return new prosemirror_menu__WEBPACK_IMPORTED_MODULE_2__.MenuItem(passedOptions);
}

function markActive(state, type) {
  var _state$selection = state.selection,
      from = _state$selection.from,
      $from = _state$selection.$from,
      to = _state$selection.to,
      empty = _state$selection.empty;
  if (empty) return !!type.isInSet(state.storedMarks || $from.marks());else return state.doc.rangeHasMark(from, to, type);
}

function markItem(markType, options) {
  var passedOptions = {
    active: function active(state) {
      return markActive(state, markType);
    }
  };

  for (var prop in options) {
    passedOptions[prop] = options[prop];
  }

  return cmdItem((0,prosemirror_commands__WEBPACK_IMPORTED_MODULE_0__.toggleMark)(markType), passedOptions);
}

/// Given a schema, look for default mark and node types in it and
/// return an object with relevant menu items relating to those marks.
function buildMenu(schema) {
  var r = {};
  var mark;
  if (mark = schema.marks.strong) r.toggleStrong = markItem(mark, {
    title: "Toggle strong style",
    icon: prosemirror_menu__WEBPACK_IMPORTED_MODULE_2__.icons.strong
  });
  if (mark = schema.marks.em) r.toggleEm = markItem(mark, {
    title: "Toggle emphasis",
    icon: prosemirror_menu__WEBPACK_IMPORTED_MODULE_2__.icons.em
  });
  var node;
  if (node = schema.nodes.paragraph) r.makeParagraph = (0,prosemirror_menu__WEBPACK_IMPORTED_MODULE_2__.blockTypeItem)(node, {
    title: "Change to paragraph",
    label: "Plain"
  });
  if (node = schema.nodes.heading) for (var i = 1; i <= 10; i++) {
    r["makeHead" + i] = (0,prosemirror_menu__WEBPACK_IMPORTED_MODULE_2__.blockTypeItem)(node, {
      title: "Change to heading " + i,
      label: "Level " + i,
      attrs: {
        level: i
      }
    });
  }
  r.typeMenu = new prosemirror_menu__WEBPACK_IMPORTED_MODULE_2__.Dropdown((0,_cut__WEBPACK_IMPORTED_MODULE_1__["default"])([r.makeParagraph, r.makeCodeBlock, r.makeHead1 && new prosemirror_menu__WEBPACK_IMPORTED_MODULE_2__.DropdownSubmenu((0,_cut__WEBPACK_IMPORTED_MODULE_1__["default"])([r.makeHead1, r.makeHead2, r.makeHead3, r.makeHead4, r.makeHead5, r.makeHead6]), {
    label: "Heading"
  })]), {
    label: "Type..."
  });
  r.inlineMenu = [(0,_cut__WEBPACK_IMPORTED_MODULE_1__["default"])([r.toggleStrong, r.toggleEm])];
  r.fullMenu = r.inlineMenu.concat([[r.typeMenu]]);
  return r;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (buildMenu);

/***/ }),

/***/ "./src/lib/components/Editor/cut.ts":
/*!******************************************!*\
  !*** ./src/lib/components/Editor/cut.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function (arr) {
  return arr.filter(function (x) {
    return x;
  });
});

/***/ }),

/***/ "./src/lib/components/Editor/index.ts":
/*!********************************************!*\
  !*** ./src/lib/components/Editor/index.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _Editor__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _Editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Editor */ "./src/lib/components/Editor/Editor.tsx");


/***/ }),

/***/ "./src/lib/components/Popup/Popup.tsx":
/*!********************************************!*\
  !*** ./src/lib/components/Popup/Popup.tsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.css */ "./src/lib/components/Popup/index.css");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./View */ "./src/lib/components/Popup/View.tsx");




var Popup = function Popup(_ref) {
  var isVisible = _ref.isVisible,
      screenPosition = _ref.screenPosition,
      items = _ref.items,
      clickHandlerProp = _ref.clickHandler;

  var clickHandler = function clickHandler(event) {
    var target = event.target;

    if (target.tagName === "LI") {
      var value = target.innerText;
      clickHandlerProp(value);
    }
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, isVisible && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_View__WEBPACK_IMPORTED_MODULE_2__["default"], {
    clickHandler: clickHandler,
    position: screenPosition
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("ul", null, items.map(function (item) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("li", {
      value: item,
      key: item,
      className: "popupItem"
    }, item);
  }))), isVisible && items.length === 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_View__WEBPACK_IMPORTED_MODULE_2__["default"], {
    position: screenPosition
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: "emptyList"
  }, "No options were provided")));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Popup);

/***/ }),

/***/ "./src/lib/components/Popup/View.tsx":
/*!*******************************************!*\
  !*** ./src/lib/components/Popup/View.tsx ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_popper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-popper */ "./node_modules/react-popper/lib/esm/usePopper.js");
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




var View = function View(_ref) {
  var _ref$clickHandler = _ref.clickHandler,
      clickHandler = _ref$clickHandler === void 0 ? function () {} : _ref$clickHandler,
      position = _ref.position,
      children = _ref.children;

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      referenceElement = _useState2[0],
      setReferenceElement = _useState2[1];

  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      popperElement = _useState4[0],
      setPopperElement = _useState4[1];

  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
      _useState6 = _slicedToArray(_useState5, 2),
      arrowElement = _useState6[0],
      setArrowElement = _useState6[1];

  var _usePopper = (0,react_popper__WEBPACK_IMPORTED_MODULE_1__.usePopper)(referenceElement, popperElement, {
    modifiers: [{
      name: "arrow",
      options: {
        element: arrowElement
      }
    }]
  }),
      styles = _usePopper.styles,
      attributes = _usePopper.attributes;

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "popupAnchor",
    style: {
      top: position.y,
      left: position.x
    },
    ref: setReferenceElement
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", _extends({
    ref: setPopperElement,
    style: styles.popper
  }, attributes.popper), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "popup",
    onClick: clickHandler
  }, children), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    ref: setArrowElement,
    style: styles.arrow
  })));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (View);

/***/ }),

/***/ "./src/lib/components/Popup/index.ts":
/*!*******************************************!*\
  !*** ./src/lib/components/Popup/index.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _Popup__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _Popup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popup */ "./src/lib/components/Popup/Popup.tsx");


/***/ }),

/***/ "./src/lib/index.tsx":
/*!***************************!*\
  !*** ./src/lib/index.tsx ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _App__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App */ "./src/lib/App.tsx");


/***/ }),

/***/ "./src/lib/plugins/autocomplete/AutocompletePopup.tsx":
/*!************************************************************!*\
  !*** ./src/lib/plugins/autocomplete/AutocompletePopup.tsx ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _components_Popup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/Popup */ "./src/lib/components/Popup/index.ts");
/* harmony import */ var _key__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./key */ "./src/lib/plugins/autocomplete/key.ts");




var SpellcheckerPopup = function SpellcheckerPopup(_ref) {
  var state = _ref.state;

  var _ref2 = _key__WEBPACK_IMPORTED_MODULE_2__["default"].getState(state),
      isVisible = _ref2.isPopupVisible,
      _ref2$clickHandler = _ref2.clickHandler,
      clickHandler = _ref2$clickHandler === void 0 ? function () {} : _ref2$clickHandler,
      screenPosition = _ref2.screenPosition,
      candidates = _ref2.candidates;

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_Popup__WEBPACK_IMPORTED_MODULE_1__["default"], {
    isVisible: isVisible,
    screenPosition: screenPosition,
    items: candidates,
    clickHandler: clickHandler
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SpellcheckerPopup);

/***/ }),

/***/ "./src/lib/plugins/autocomplete/autocomplete.ts":
/*!******************************************************!*\
  !*** ./src/lib/plugins/autocomplete/autocomplete.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var prosemirror_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prosemirror-state */ "./node_modules/prosemirror-state/dist/index.es.js");
/* harmony import */ var _dataProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dataProvider */ "./src/lib/plugins/autocomplete/dataProvider.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers */ "./src/lib/plugins/autocomplete/helpers.ts");
/* harmony import */ var _key__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./key */ "./src/lib/plugins/autocomplete/key.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






function createAutocompletePlugin() {
  var dataProvider = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new _dataProvider__WEBPACK_IMPORTED_MODULE_1__["default"]();
  return new prosemirror_state__WEBPACK_IMPORTED_MODULE_0__.Plugin({
    key: _key__WEBPACK_IMPORTED_MODULE_3__["default"],
    state: {
      init: function init() {
        return _objectSpread({
          docChanged: false,
          isPopupVisible: false,
          screenPosition: null,
          clickHandler: null,
          selectedRange: null,
          candidates: [],
          cursorDeco: null
        }, this.spec.state);
      },
      apply: function apply(tr, prev) {
        var _meta$isPopupVisible, _meta$selectedRange, _meta$screenPosition, _meta$clickHandler, _meta$candidates;

        var meta = tr.getMeta(this.spec.key);
        var isPopupVisible = (_meta$isPopupVisible = meta === null || meta === void 0 ? void 0 : meta.isPopupVisible) !== null && _meta$isPopupVisible !== void 0 ? _meta$isPopupVisible : prev.isPopupVisible;
        var selectedRange = (_meta$selectedRange = meta === null || meta === void 0 ? void 0 : meta.selectedRange) !== null && _meta$selectedRange !== void 0 ? _meta$selectedRange : prev.selectedRange;
        var screenPosition = (_meta$screenPosition = meta === null || meta === void 0 ? void 0 : meta.screenPosition) !== null && _meta$screenPosition !== void 0 ? _meta$screenPosition : prev.screenPosition;
        var clickHandler = (_meta$clickHandler = meta === null || meta === void 0 ? void 0 : meta.clickHandler) !== null && _meta$clickHandler !== void 0 ? _meta$clickHandler : prev.clickHandler;
        var candidates = (_meta$candidates = meta === null || meta === void 0 ? void 0 : meta.candidates) !== null && _meta$candidates !== void 0 ? _meta$candidates : prev.candidates;
        return _objectSpread(_objectSpread({}, prev), {}, {
          docChanged: tr.docChanged,
          isPopupVisible: isPopupVisible,
          screenPosition: screenPosition,
          clickHandler: clickHandler,
          candidates: candidates,
          selectedRange: selectedRange
        });
      }
    },
    props: {
      handleClick: function handleClick(view) {
        view.dispatch(view.state.tr.setMeta(this.spec.key, {
          isPopupVisible: false
        }));
        return false;
      },
      handleKeyDown: function handleKeyDown(view, event) {
        var _this = this;

        var currectState = this.spec.key.getState(view.state);
        dataProvider.getAbortionController.abort();

        if (event.key !== "Tab") {
          if (currectState.isPopupVisible) {
            view.dispatch(view.state.tr.setMeta(this.spec.key, {
              isPopupVisible: false
            }));
          }
        } else {
          if (view.state.selection.empty) {
            var _ref = view.state.selection,
                cursorPositions = _ref.$cursor.pos;
            (0,_helpers__WEBPACK_IMPORTED_MODULE_2__.checkPosition)(view, cursorPositions, function (word, marks, screenPosition, range) {
              dataProvider.requestData(word).then(function (results) {
                if (results.length) {
                  view.dispatch(view.state.tr.setMeta(_this.spec.key, {
                    isPopupVisible: true,
                    screenPosition: screenPosition,
                    candidates: results,
                    clickHandler: (0,_helpers__WEBPACK_IMPORTED_MODULE_2__.createCorrectionFunction)(view, range, marks)
                  }));
                }
              });
            });
          }

          return true;
        }
      }
    }
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createAutocompletePlugin);

/***/ }),

/***/ "./src/lib/plugins/autocomplete/dataProvider.ts":
/*!******************************************************!*\
  !*** ./src/lib/plugins/autocomplete/dataProvider.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DICTIONARY = ["donkey", "dolphin", "dog", "zebra", "snake", "snail", "sparrow", "spider", "shark", "lion", "lobster", "lizard", "lama", "locust", "cat", "rabbit", "giraffi", "horse"];

var LocalDataProvider = /*#__PURE__*/function () {
  function LocalDataProvider() {
    _classCallCheck(this, LocalDataProvider);

    _defineProperty(this, "localDictionary", {});

    _defineProperty(this, "abortionController", {
      timerId: null,
      abort: function () {
        if (this.timerId !== null) {
          clearTimeout(this.timerId);
        }
      }.bind(this)
    });
  }

  _createClass(LocalDataProvider, [{
    key: "getAbortionController",
    get: function get() {
      return this.abortionController;
    }
  }, {
    key: "requestData",
    value: function requestData(token) {
      this.abortionController.abort();
      return new Promise(function (resolve) {
        if (this.localDictionary[token]) {
          resolve(this.localDictionary[token]);
        } else {
          // Emulating the network request
          this.abortionController.timerId = setTimeout(function () {
            this.abortionController.timerId = null;
            var results = DICTIONARY.filter(function (key) {
              return key.length > token.length && key.startsWith(token.toLowerCase());
            }); // Do the local caching

            this.localDictionary[token] = results;
            resolve(results);
          }.bind(this), 2000);
        }
      }.bind(this));
    }
  }]);

  return LocalDataProvider;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LocalDataProvider);

/***/ }),

/***/ "./src/lib/plugins/autocomplete/helpers.ts":
/*!*************************************************!*\
  !*** ./src/lib/plugins/autocomplete/helpers.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkPosition": () => (/* binding */ checkPosition),
/* harmony export */   "createCorrectionFunction": () => (/* binding */ createCorrectionFunction),
/* harmony export */   "getLastWordFromNode": () => (/* binding */ getLastWordFromNode),
/* harmony export */   "getNodeByPosition": () => (/* binding */ getNodeByPosition)
/* harmony export */ });
/* harmony import */ var prosemirror_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prosemirror-state */ "./node_modules/prosemirror-state/dist/index.es.js");
/* harmony import */ var _key__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./key */ "./src/lib/plugins/autocomplete/key.ts");


/**
 *
 * Creates the function that will be used to replace the word with the correction
 *
 **/

function createCorrectionFunction(view, _ref, marks) {
  var from = _ref.from,
      to = _ref.to;
  return function (correction) {
    var transaction = view.state.tr.replaceWith(from, to, view.state.schema.text(correction, marks));
    var step = transaction.steps[0];
    var map = step.getMap();
    var stepTo = map.map(step.to, 1);
    transaction = transaction.setSelection(prosemirror_state__WEBPACK_IMPORTED_MODULE_0__.TextSelection.create(transaction.doc, stepTo));
    transaction.setMeta(_key__WEBPACK_IMPORTED_MODULE_1__["default"], {
      isPopupVisible: false
    });
    view.dispatch(transaction);
    view.focus();
  };
}
/**
 * Function to check and react on autocomplete initiation event
 * Finds the node by the position of the cursor and checks if it is a word calling a callback function after this
 */

function checkPosition(view, position, callback) {
  var _getNodeByPosition = getNodeByPosition(view.state.doc, position),
      node = _getNodeByPosition.node,
      from = _getNodeByPosition.from,
      to = _getNodeByPosition.to;

  var token = view.state.doc.textBetween(from, to, " ");
  var letterRegEx = /\w/g;
  var matchLetter = token.length > 0 ? token[token.length - 1].match(letterRegEx) : null;

  if (position === to && matchLetter !== null) {
    var word = getLastWordFromNode(node);
    var cursorViewPortPosition = view.coordsAtPos(position);
    var screenPosition = {
      x: cursorViewPortPosition.left,
      y: cursorViewPortPosition.bottom + 4
    };
    var range = {
      from: to - word.length,
      to: to
    };
    callback(word, node.marks, screenPosition, range);
  }
}
function getLastWordFromNode(node) {
  var wordRegEx = /\w+/g;
  var matchWord = node.text.match(wordRegEx);
  return matchWord[matchWord.length - 1];
}
function getNodeByPosition(doc, position) {
  var resolvedPos = doc.resolve(position);
  var parentInfo = resolvedPos.parent.childBefore(resolvedPos.parentOffset);
  var node = parentInfo.node;
  var nodeStartPos = parentInfo.offset;
  var posInParent = resolvedPos.parentOffset;
  var offsetInLink = posInParent - nodeStartPos;
  var nodeFrom = position - offsetInLink;
  var nodeTo = nodeFrom + node.nodeSize;
  return {
    node: node,
    from: nodeFrom,
    to: nodeTo
  };
}

/***/ }),

/***/ "./src/lib/plugins/autocomplete/index.ts":
/*!***********************************************!*\
  !*** ./src/lib/plugins/autocomplete/index.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AutocompletePopup": () => (/* reexport safe */ _AutocompletePopup__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "default": () => (/* reexport safe */ _autocomplete__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _autocomplete__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./autocomplete */ "./src/lib/plugins/autocomplete/autocomplete.ts");
/* harmony import */ var _AutocompletePopup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AutocompletePopup */ "./src/lib/plugins/autocomplete/AutocompletePopup.tsx");



/***/ }),

/***/ "./src/lib/plugins/autocomplete/key.ts":
/*!*********************************************!*\
  !*** ./src/lib/plugins/autocomplete/key.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var prosemirror_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prosemirror-state */ "./node_modules/prosemirror-state/dist/index.es.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new prosemirror_state__WEBPACK_IMPORTED_MODULE_0__.PluginKey("autocomplete-plugin"));

/***/ }),

/***/ "./src/lib/plugins/spellchecker/SpellcheckerPopup.tsx":
/*!************************************************************!*\
  !*** ./src/lib/plugins/spellchecker/SpellcheckerPopup.tsx ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _components_Popup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/Popup */ "./src/lib/components/Popup/index.ts");
/* harmony import */ var _key__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./key */ "./src/lib/plugins/spellchecker/key.ts");




var SpellcheckerPopup = function SpellcheckerPopup(_ref) {
  var _errorMap$keyForError;

  var state = _ref.state;

  var _ref2 = _key__WEBPACK_IMPORTED_MODULE_2__["default"].getState(state),
      isVisible = _ref2.isPopupVisible,
      selectedRange = _ref2.selectedRange,
      screenPosition = _ref2.screenPosition,
      _ref2$clickHandler = _ref2.clickHandler,
      clickHandler = _ref2$clickHandler === void 0 ? function () {} : _ref2$clickHandler,
      errorMap = _ref2.errorMap;

  var keyForErrorMap = "".concat(selectedRange === null || selectedRange === void 0 ? void 0 : selectedRange.from, "-").concat(selectedRange === null || selectedRange === void 0 ? void 0 : selectedRange.to);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_Popup__WEBPACK_IMPORTED_MODULE_1__["default"], {
    isVisible: isVisible,
    screenPosition: screenPosition,
    items: (_errorMap$keyForError = errorMap[keyForErrorMap]) !== null && _errorMap$keyForError !== void 0 ? _errorMap$keyForError : [],
    clickHandler: clickHandler
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SpellcheckerPopup);

/***/ }),

/***/ "./src/lib/plugins/spellchecker/dataProvider.ts":
/*!******************************************************!*\
  !*** ./src/lib/plugins/spellchecker/dataProvider.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LocalDataProvider)
/* harmony export */ });
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DICTIONARY = ["donkey", "dolphin", "dog", "zebra", "snake", "snail", "sparrow", "spider", "shark", "lion", "lobster", "lizard", "lama", "locust", "cat", "rabbit", "giraffi", "horse"];

var suggester = function suggester(token) {
  var result = new Set();
  var dict = [].concat(DICTIONARY);

  var _loop = function _loop(i) {
    var char = token.slice(0, i);
    var words = dict.filter(function (d) {
      return d.startsWith(char);
    });
    words.forEach(function (word) {
      if (word.length > token.length - 2 && word.length < token.length + 2) result.add(word);
    });
  };

  for (var i = 1; i < token.length; i++) {
    _loop(i);
  }

  return Array.from(result);
};

var LocalDataProvider = /*#__PURE__*/function () {
  function LocalDataProvider() {
    _classCallCheck(this, LocalDataProvider);

    _defineProperty(this, "abortionController", {
      timerId: null,
      abort: function () {
        if (this.timerId !== null) {
          clearTimeout(this.timerId);
        }
      }.bind(this)
    });
  }

  _createClass(LocalDataProvider, [{
    key: "getAbortionController",
    get: function get() {
      return this.abortionController;
    }
  }, {
    key: "requestData",
    value: function requestData(words) {
      this.abortionController.abort();
      return new Promise(function (resolve) {
        this.abortionController.timerId = setTimeout(function () {
          var errors = [];

          for (var i = 0; i < words.length; i++) {
            var word = words[i];

            if (!DICTIONARY.includes(word.text)) {
              var candidates = suggester(word.text);
              errors.push(_objectSpread(_objectSpread({}, word), {}, {
                correction: candidates
              }));
            }
          }

          resolve(errors);
        }, 2000);
      }.bind(this));
    }
  }]);

  return LocalDataProvider;
}();



/***/ }),

/***/ "./src/lib/plugins/spellchecker/helpers.ts":
/*!*************************************************!*\
  !*** ./src/lib/plugins/spellchecker/helpers.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createCorrectionFunction": () => (/* binding */ createCorrectionFunction),
/* harmony export */   "createDecorations": () => (/* binding */ createDecorations),
/* harmony export */   "createErrorMap": () => (/* binding */ createErrorMap),
/* harmony export */   "debouncedCall": () => (/* binding */ debouncedCall),
/* harmony export */   "gatherAllWords": () => (/* binding */ gatherAllWords)
/* harmony export */ });
/* harmony import */ var prosemirror_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prosemirror-view */ "./node_modules/prosemirror-view/dist/index.es.js");
/* harmony import */ var prosemirror_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prosemirror-state */ "./node_modules/prosemirror-state/dist/index.es.js");
/* harmony import */ var _key__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./key */ "./src/lib/plugins/spellchecker/key.ts");



/**
 * Traverses the document and returns each words in the document separately with its borders.
 */

function gatherAllWords(doc) {
  var words = [];

  function record(text, from, to) {
    words.push({
      text: text,
      from: from,
      to: to
    });
  } // For each node in the document


  doc.descendants(function (node, pos) {
    if (node.isText) {
      var wordRegEx = /\w+/g;
      var match = null; // Scan text nodes for suspicious patterns

      while (match = wordRegEx.exec(node.text)) {
        record(match[0], doc.resolve(pos + match.index).pos, doc.resolve(pos + match.index + match[0].length).pos);
      }
    }
  });
  return words;
}
/**
 *
 * Creates a map of errors for a given document.
 * Maps helps to compare the ragne in the doc with the suggested variants of replacement.
 *
 */

function createErrorMap(errors) {
  var map = {};
  errors.forEach(function (error) {
    if (error.correction.length) {
      var _key = "".concat(error.from, "-").concat(error.to);

      map[_key] = error.correction;
    }
  });
  return map;
}
function createDecorations(errors, doc) {
  var decos = [];
  errors.forEach(function (prob) {
    decos.push(prosemirror_view__WEBPACK_IMPORTED_MODULE_0__.Decoration.inline(prob.from, prob.to, {
      class: "spellError"
    }));
  });
  return prosemirror_view__WEBPACK_IMPORTED_MODULE_0__.DecorationSet.create(doc, decos);
}
/**
 *
 * Creates the function that will be used to replace the word with the correction
 *
 **/

function createCorrectionFunction(view, _ref) {
  var from = _ref.from,
      to = _ref.to;
  return function (correction) {
    var transaction = view.state.tr.replaceWith(from, to, view.state.schema.text(correction));
    var $newPos = transaction.doc.resolve(transaction.mapping.map(from + correction.length));
    transaction = transaction.setSelection(new prosemirror_state__WEBPACK_IMPORTED_MODULE_1__.TextSelection($newPos, $newPos));
    transaction.setMeta(_key__WEBPACK_IMPORTED_MODULE_2__["default"], {
      isPopupVisible: false
    });
    view.dispatch(transaction);
    view.focus();
  };
}
/**
 *
 * Cheap version of debouncer. Works only for one function
 *
 * **/

var debouncedCall = function () {
  var timerId = null;
  return function (callback) {
    var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5000;

    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(function () {
      clearTimeout(timerId);
      callback();
    }, timeout);
  };
}();

/***/ }),

/***/ "./src/lib/plugins/spellchecker/index.ts":
/*!***********************************************!*\
  !*** ./src/lib/plugins/spellchecker/index.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SpellcheckerPopup": () => (/* reexport safe */ _SpellcheckerPopup__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "default": () => (/* reexport safe */ _spellchecker__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _spellchecker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./spellchecker */ "./src/lib/plugins/spellchecker/spellchecker.tsx");
/* harmony import */ var _SpellcheckerPopup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SpellcheckerPopup */ "./src/lib/plugins/spellchecker/SpellcheckerPopup.tsx");



/***/ }),

/***/ "./src/lib/plugins/spellchecker/key.ts":
/*!*********************************************!*\
  !*** ./src/lib/plugins/spellchecker/key.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var prosemirror_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prosemirror-state */ "./node_modules/prosemirror-state/dist/index.es.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new prosemirror_state__WEBPACK_IMPORTED_MODULE_0__.PluginKey("spellchecker-plugin"));

/***/ }),

/***/ "./src/lib/plugins/spellchecker/spellchecker.tsx":
/*!*******************************************************!*\
  !*** ./src/lib/plugins/spellchecker/spellchecker.tsx ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.css */ "./src/lib/plugins/spellchecker/index.css");
/* harmony import */ var prosemirror_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prosemirror-view */ "./node_modules/prosemirror-view/dist/index.es.js");
/* harmony import */ var prosemirror_state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prosemirror-state */ "./node_modules/prosemirror-state/dist/index.es.js");
/* harmony import */ var _dataProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dataProvider */ "./src/lib/plugins/spellchecker/dataProvider.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./helpers */ "./src/lib/plugins/spellchecker/helpers.ts");
/* harmony import */ var _key__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./key */ "./src/lib/plugins/spellchecker/key.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }








function createAutocompletePlugin() {
  var dataProvider = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new _dataProvider__WEBPACK_IMPORTED_MODULE_3__["default"]();
  return new prosemirror_state__WEBPACK_IMPORTED_MODULE_2__.Plugin({
    key: _key__WEBPACK_IMPORTED_MODULE_5__["default"],
    view: function view(_view) {
      _view.dom.spellcheck = false;
      var pluginKey = this.key;
      return {
        update: function update(editor) {
          var nextPluginState = pluginKey.getState(editor.state);

          if (nextPluginState.docChanged) {
            dataProvider.getAbortionController.abort();
            (0,_helpers__WEBPACK_IMPORTED_MODULE_4__.debouncedCall)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
              var words, errors, decorations, errorMap;
              return _regeneratorRuntime().wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      words = (0,_helpers__WEBPACK_IMPORTED_MODULE_4__.gatherAllWords)(editor.state.doc);
                      _context.next = 3;
                      return dataProvider.requestData(words);

                    case 3:
                      errors = _context.sent;
                      decorations = (0,_helpers__WEBPACK_IMPORTED_MODULE_4__.createDecorations)(errors, editor.state.doc);
                      errorMap = (0,_helpers__WEBPACK_IMPORTED_MODULE_4__.createErrorMap)(errors);
                      editor.dispatch(editor.state.tr.setMeta(pluginKey, {
                        decorations: decorations,
                        errors: errors,
                        errorMap: errorMap
                      }));

                    case 7:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            })), 2000);
          }
        }
      };
    },
    state: {
      init: function init() {
        return _objectSpread({
          docChanged: false,
          isPopupVisible: false,
          decoration: prosemirror_view__WEBPACK_IMPORTED_MODULE_1__.DecorationSet.empty,
          errors: [],
          errorMap: {},
          screenPosition: null,
          clickHandler: null,
          selectedRange: null,
          cursorDeco: null
        }, this.spec.state);
      },
      apply: function apply(tr, prev) {
        var _meta$decorations, _meta$errors, _meta$errorMap, _meta$selectedRange, _meta$isPopupVisible, _meta$screenPosition, _meta$clickHandler;

        var meta = tr.getMeta(this.spec.key);
        var decoration = tr.docChanged ? prosemirror_view__WEBPACK_IMPORTED_MODULE_1__.DecorationSet.empty : (_meta$decorations = meta === null || meta === void 0 ? void 0 : meta.decorations) !== null && _meta$decorations !== void 0 ? _meta$decorations : prev.decoration;
        var errors = (_meta$errors = meta === null || meta === void 0 ? void 0 : meta.errors) !== null && _meta$errors !== void 0 ? _meta$errors : prev.errors;
        var errorMap = (_meta$errorMap = meta === null || meta === void 0 ? void 0 : meta.errorMap) !== null && _meta$errorMap !== void 0 ? _meta$errorMap : prev.errorMap;
        var selectedRange = (_meta$selectedRange = meta === null || meta === void 0 ? void 0 : meta.selectedRange) !== null && _meta$selectedRange !== void 0 ? _meta$selectedRange : prev.selectedRange;
        var isPopupVisible = (_meta$isPopupVisible = meta === null || meta === void 0 ? void 0 : meta.isPopupVisible) !== null && _meta$isPopupVisible !== void 0 ? _meta$isPopupVisible : prev.isPopupVisible;
        var screenPosition = (_meta$screenPosition = meta === null || meta === void 0 ? void 0 : meta.screenPosition) !== null && _meta$screenPosition !== void 0 ? _meta$screenPosition : prev.screenPosition;
        var clickHandler = (_meta$clickHandler = meta === null || meta === void 0 ? void 0 : meta.clickHandler) !== null && _meta$clickHandler !== void 0 ? _meta$clickHandler : prev.clickHandler;
        return _objectSpread(_objectSpread({}, prev), {}, {
          docChanged: tr.docChanged,
          decoration: decoration,
          errors: errors,
          isPopupVisible: isPopupVisible,
          screenPosition: screenPosition,
          clickHandler: clickHandler,
          selectedRange: selectedRange,
          errorMap: errorMap
        });
      }
    },
    props: {
      decorations: function decorations(state) {
        var _this$getState = this.getState(state),
            decoration = _this$getState.decoration;

        return decoration;
      },
      handleKeyDown: function handleKeyDown(view) {
        var currectState = this.spec.key.getState(view.state);

        if (currectState.isPopupVisible) {
          view.dispatch(view.state.tr.setMeta(this.spec.key, {
            isPopupVisible: false
          }));
        }

        return false;
      },
      handleClick: function handleClick(view, pos, event) {
        if (!event.altKey) {
          view.dispatch(view.state.tr.setMeta(this.spec.key, {
            isPopupVisible: false
          }));
        } else {
          var _this$getState2 = this.getState(view.state),
              decoration = _this$getState2.decoration;

          var deco = decoration.find(pos, pos)[0];
          if (!deco) return;
          var $from = view.state.doc.resolve(deco.from);
          var from = deco.from - $from.start();
          var to = deco.to - $from.start();
          var coords = view.coordsAtPos(pos);
          var screenPosition = {
            x: coords.left,
            y: coords.bottom - 4
          }; // Я понимаю что тут видимо как-то нужно использовать map, но не очень понимаю как именно

          var range = {
            from: from + 1,
            to: to + 1
          };
          view.dispatch(view.state.tr.setMeta(this.spec.key, {
            isPopupVisible: true,
            screenPosition: screenPosition,
            clickHandler: (0,_helpers__WEBPACK_IMPORTED_MODULE_4__.createCorrectionFunction)(view, range),
            selectedRange: range
          }));
          event.preventDefault();
          return true;
        }
      }
    }
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createAutocompletePlugin);

/***/ }),

/***/ "./src/lib/components/Editor/index.css":
/*!*********************************************!*\
  !*** ./src/lib/components/Editor/index.css ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/lib/components/Popup/index.css":
/*!********************************************!*\
  !*** ./src/lib/components/Popup/index.css ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/lib/index.css":
/*!***************************!*\
  !*** ./src/lib/index.css ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/lib/plugins/spellchecker/index.css":
/*!************************************************!*\
  !*** ./src/lib/plugins/spellchecker/index.css ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkprose_mirror_react_wrapper"] = self["webpackChunkprose_mirror_react_wrapper"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor"], () => (__webpack_require__("./src/demo/index.tsx")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=main.bundle.js.map