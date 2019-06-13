import React, { useState } from "react";
import Loader from "react-loader-spinner";

import "./item-add-form.css";

const ItemAddForm = ({ onAddItem, token, userId, addLoading }) => {
  const [label, setLabel] = useState("");
  const [disabledAddButton, setDisabledAddButton] = useState(true);

  // setDisabledAddButton(label.trim() === "");

  const onLabelChange = e => {
    setLabel(e.target.value);
    setDisabledAddButton(e.target.value.trim() === "");
  };

  const onSubmit = e => {
    e.preventDefault();
    onAddItem(label, token, userId);
    setLabel("");
    setDisabledAddButton(true);
  };

  let button = (
    <button className="btn" disabled={disabledAddButton}>
      Add Item
    </button>
  );
  if (addLoading) {
    button = <Loader type="Circles" color="#222" height={30} width={95} />;
  }
  return (
    <form className="item-add-form d-flex" onSubmit={onSubmit}>
      <input
        autoFocus
        type="text"
        className="form-control"
        onChange={onLabelChange}
        placeholder="What needs to bedone"
        value={label}
      />
      <div>{button}</div>
    </form>
  );
};

export default ItemAddForm;
