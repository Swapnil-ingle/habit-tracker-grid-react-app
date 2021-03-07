import React from "react";
import { Link } from "react-router-dom";

import "./NavBar.css";

const NavBar = () => {
  return (
    <nav>
      <Link to="/">
        <h3>GridHabitTracker</h3>
      </Link>
      <Link to="/signUp">
        <button>Sign Up</button>
      </Link>
    </nav>
  );
};

export default NavBar;
