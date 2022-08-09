import React from "react";
import ReactDOM from "react-dom";
// import "./styles/styles.scss";
// import "./styles/pagination.scss";

import App from "../lib/index.tsx";

const root = document.getElementById("react-root");

ReactDOM.render(<App />, root);

if (module.hot) {
  module.hot.accept();
}
