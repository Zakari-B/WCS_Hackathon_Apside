import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

import ExportContext from "./contexts/BubbleContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    {/* <React.StrictMode> */}
    <ExportContext.BubbleProvider>
      <App />
    </ExportContext.BubbleProvider>

    {/* </React.StrictMode> */}
  </BrowserRouter>
);
