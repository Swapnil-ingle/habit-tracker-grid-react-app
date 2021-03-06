import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AppProvider } from "./context/context";
import NavBar from "./components/NavBar/NavBar";

ReactDOM.render(
  <AppProvider>
    <NavBar />
    <App />
  </AppProvider>,
  document.getElementById("root")
);
