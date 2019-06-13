import React from "react";
import "./Backdrop.css";

// фон при активном модальном окне
const backdrop = props =>
  props.show ? <div className="Backdrop" onClick={props.clicked} /> : null;

export default backdrop;
