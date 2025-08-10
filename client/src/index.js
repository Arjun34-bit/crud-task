import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import EmpProvider from "./context/EmpProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <EmpProvider>
      <App />
    </EmpProvider>
  </React.StrictMode>
);
