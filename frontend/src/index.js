import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./component/component.css";
// import { ToastContainer } from "react-toastify";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <ToastContainer /> */}
  </React.StrictMode>
);
