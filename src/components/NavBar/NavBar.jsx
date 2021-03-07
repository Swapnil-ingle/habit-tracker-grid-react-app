import React from "react";
import FormBtn from "../Form/FormBtn/FormBtn";
import { Link } from "react-router-dom";

import "./NavBar.css";

const NavBar = () => {
  return (
    <nav>
      <Link to="/">
        <h2>GridHabitTracker</h2>
      </Link>
      <Link to="/signUp">
        <h2>Sign Up</h2>
      </Link>
      <div>
        <FormBtn />
      </div>
    </nav>
  );
};

export default NavBar;
