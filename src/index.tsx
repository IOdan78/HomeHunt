import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./assets/styles/styles.scss";
import { LoginProvider } from "./components/Global/LoginContext";
import { PollingProvider } from "./components/HomePage/PollingContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <LoginProvider>
        <PollingProvider>
          <App />
        </PollingProvider>
      </LoginProvider>
    </BrowserRouter>
  </React.StrictMode>
);
