import React from "react";
import ReactDOM from "react-dom";

import ProseMirror from "./../lib/index";

const root = document.getElementById("react-root");

ReactDOM.render(
  <div>
    <ProseMirror />
  </div>,
  root
);

if (module.hot) {
  module.hot.accept();
}
