import React from "react";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import TableChartIcon from "@material-ui/icons/TableChart";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import HelpIcon from "@material-ui/icons/Help";
import { useGlobalContext } from "../../context/context";

import "./NavBar.css";
import { useAuthContext } from "../../context/AuthContext";

const NavBar = () => {
  const { markAsUnvisited, isUsersFirstTime } = useGlobalContext();
  const { currentUser } = useAuthContext();

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
        <Link className="user-live-dot-container" to="/login">
          <button>
            <AccountCircleIcon style={{ fontSize: 30 }} />
          </button>
          {!isUsersFirstTime && (
            <FiberManualRecordIcon
              className={`user-live-dot user-live-dot-${
                currentUser ? "on" : "off"
              }`}
            />
          )}
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
