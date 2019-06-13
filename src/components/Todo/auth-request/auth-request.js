import React from "react";
import { NavLink } from "react-router-dom";

import "./auth-request.css";

const AuthRequest = props => {
  return (
    <div className="AuthRequest">
      <NavLink to="/auth">
        <span>Let's</span>
        <span>Start</span>
      </NavLink>
    </div>
  );
};

export default AuthRequest;
