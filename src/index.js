import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { AppProvider } from "./context/context";
import { AuthProvider } from "./context/AuthContext";

import SignUp from "./components/User/SignUp/SignUp";
import Login from "./components/User/Login/Login";
import ForgotPassword from "./components/User/ForgotPassword/ForgotPassword";
import UpdateProfile from "./components/User/UpdateProfile/UpdateProfile";

import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Credits from "./components/Credits/Credits";

ReactDOM.render(
  <AuthProvider>
    <AppProvider>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/signUp" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/update-profile" component={UpdateProfile} />
          <Route path="/credits" component={Credits} />
        </Switch>
        <Footer />
      </Router>
    </AppProvider>
  </AuthProvider>,
  document.getElementById("root")
);
