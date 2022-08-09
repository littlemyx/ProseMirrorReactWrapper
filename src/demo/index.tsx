import React from "react";
import ReactDOM from "react-dom";
// import "./styles/styles.scss";
// import "./styles/pagination.scss";

import ProseMirror from "../lib/ProseMirrorWrapper";

const root = document.getElementById("react-root");

ReactDOM.render(<ProseMirror />, root);

if (module.hot) {
  module.hot.accept();
}
