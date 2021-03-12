import React from "react";
import { Link } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import TableChartIcon from "@material-ui/icons/TableChart";
import HelpIcon from "@material-ui/icons/Help";
import { useGlobalContext } from "../../context/context";

import "./NavBar.css";

const NavBar = () => {
  const { markAsUnvisited } = useGlobalContext();

  return (
    <nav>
      <Link to="/">
        <h2>
          <TableChartIcon /> Hagrid
        </h2>
      </Link>
      <div className="nav-icon-container">
        <Link to="/">
          <button onClick={markAsUnvisited}>
            <HelpIcon style={{ fontSize: 30 }} />
          </button>
        </Link>
        <Link to="/signUp">
          <button>
            <ExitToAppIcon style={{ fontSize: 30 }} />
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
