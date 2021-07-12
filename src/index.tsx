import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import LoginContextProvider from "./context/LoginContextProvider";
import ValidationContextProvider from "./context/ValidationContextProvider";

ReactDOM.render(
  <React.StrictMode>
    <LoginContextProvider>
      <ValidationContextProvider>
        <App />
      </ValidationContextProvider>
    </LoginContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
