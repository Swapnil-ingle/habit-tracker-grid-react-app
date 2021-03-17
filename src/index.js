import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import SignUp from "./components/SignUp/SignUp";
import { AppProvider } from "./context/context";
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Login/Login";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile/UpdateProfile";
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
