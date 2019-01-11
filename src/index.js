import React from "react";
import ReactDOM from "react-dom";
import App from "../src/components/App";
import { BrowserRouter } from "react-router-dom";
import "../src/styles/index.css";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
)
