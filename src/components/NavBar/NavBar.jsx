import React from "react";
import { Link } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import TableChartIcon from "@material-ui/icons/TableChart";

import "./NavBar.css";

const NavBar = () => {
  return (
    <nav>
      <Link to="/">
        <h2>
          <TableChartIcon /> Hagrid
        </h2>
      </Link>
      <Link to="/signUp">
        <button>
          <ExitToAppIcon style={{ fontSize: 30 }} />
        </button>
      </Link>
    </nav>
  );
};

export default NavBar;
