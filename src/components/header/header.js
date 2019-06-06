import React from "react";
import { NavLink } from "react-router-dom";

import "./Header.css";

const Header = props => {
  return (
    <>
      <ul className="nav-items">
        <li className="nav-item">
          <NavLink to="/" exact>
            List
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/auth" exact>
            Auth
          </NavLink>
        </li>
      </ul>
    </>
  );
};

export default Header;
