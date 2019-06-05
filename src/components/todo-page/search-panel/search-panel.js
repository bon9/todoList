import React, { useState } from "react";
import "./search-panel.css";

export default function SearchPanel(props) {
  const [term, setTerm] = useState("");

  function onSearchChange(e) {
    const term = e.target.value;
    setTerm(term);
    props.onSearchChange(term);
  }

  return (
    <input
      type="text"
      className="form-control search-input"
      placeholder="type to search"
      onChange={onSearchChange}
      value={term}
    />
  );
}
