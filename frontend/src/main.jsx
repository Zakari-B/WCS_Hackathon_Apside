import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

import ExportContextKeyword from "./contexts/KeywordContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    {/* <React.StrictMode> */}
    <ExportContextKeyword.KeywordProvider>
      <App />
    </ExportContextKeyword.KeywordProvider>

    {/* </React.StrictMode> */}
  </BrowserRouter>
);
