import React from "react";

import "./todo-list-item.css";

export default function TodoListItem({
  label,
  removeItem,
  toggleProperty,
  done,
  important
}) {
  let classNames = "todo-list-item";
  if (done) {
    classNames += " done";
  }
  if (important) {
    classNames += " important";
  }

  return (
    <span className={classNames}>
      <span
        className="todo-list-item-label"
        onClick={() => toggleProperty("done")}
      >
        {label}
      </span>
      <div>
        <button
          type="button"
          className="btn btn-outline-danger btn-sm float-right"
          onClick={removeItem}
        >
          <i className="far fa-trash-alt" />
        </button>
        <button
          type="button"
          className="btn btn-outline-success btn-sm float-right"
          onClick={() => toggleProperty("important")}
        >
          <i className="fa fa-exclamation" />
        </button>
      </div>
    </span>
  );
}
