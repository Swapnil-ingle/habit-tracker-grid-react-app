import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import SignUp from "./components/SignUp/SignUp";
import { AppProvider } from "./context/context";
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.render(
  <AuthProvider>
    <AppProvider>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/signUp" component={SignUp} />
        </Switch>
      </Router>
    </AppProvider>
  </AuthProvider>,
  document.getElementById("root")
);
