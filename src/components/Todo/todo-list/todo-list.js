import React from "react";

import TodoListItem from "../todo-list-item/todo-list-item";
import "./todo-list.css";

const ToDoList = ({ todos, removeItem, toggleProperty }) => {
  const elements = todos.map(item => {
    const { id, ...itemProps } = item;
    return (
      <li key={id} className="list-group-item">
        <TodoListItem
          {...itemProps}
          removeItem={() => removeItem(id)}
          toggleProperty={prop => toggleProperty(prop, id)}
        />
      </li>
    );
  });
  return <ul className="list-group todo-list">{elements}</ul>;
};

export default ToDoList;
