import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/index.css";

// render to page
const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
