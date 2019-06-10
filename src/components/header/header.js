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
          {props.isAuth ? (
            <NavLink to="/logout">Logout</NavLink>
          ) : (
            <NavLink to="/auth">Auth</NavLink>
          )}
        </li>
      </ul>
    </>
  );
};

export default Header;
