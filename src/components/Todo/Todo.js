import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import HeaderTodo from "./header-todo/header-todo";
import SearchPanel from "./search-panel/search-panel";
import ToDoList from "./todo-list/todo-list";
import ItemStatusFilter from "./item-status-filter/item-status-filter";
import ItemAddForm from "./item-add-form/item-add-form";
import "./Todo.css";
import * as actions from "../../store/actions";

const Todo = props => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (props.isAuth) {
      props.onInitTodoList(props.token, props.userId);
    }
    console.log("[useEffect Todo]");
  }, []);

  const onSearchChange = searchQuery => {
    setSearchQuery(searchQuery);
  };

  const onFilterChange = filter => {
    setFilter(filter);
  };

  const search = (items, query) => {
    if (query.length === 0) {
      return items;
    }
    // оставит только item, для которых вернулось true
    return items.filter(item => {
      // вернет true, если найдет query в item
      return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
    });
  };

  const statusFilter = (items, filter) => {
    switch (filter) {
      case "all":
        return items;
      case "active":
        return items.filter(item => !item.done);
      case "done":
        return items.filter(item => item.done);
      default:
        return items;
    }
  };

  // отфильтрованные элементы по запросу в строке и кнопке-фильтру (all,active,done)
  const visibleItems = statusFilter(
    search(props.todoData, searchQuery),
    filter
  );
  const doneCount = props.todoData.filter(el => el.done).length;
  const todoCount = props.todoData.length - doneCount;
  return (
    <div className="todo-app">
      <HeaderTodo toDo={todoCount} done={doneCount} isAuth={props.isAuth} />
      <div className="top-panel d-flex">
        <SearchPanel onSearchChange={onSearchChange} />
        <ItemStatusFilter filter={filter} onFilterChange={onFilterChange} />
      </div>

      {props.isAuth ? (
        <ToDoList
          todos={visibleItems}
          removeItem={props.onRemoveItem}
          toggleProperty={props.onToggleProperty}
        />
      ) : (
        <p>Регайся</p>
      )}

      <ItemAddForm
        onAddItem={props.onAddItem}
        token={props.token}
        userId={props.userId}
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    todoData: state.todo.todoData,
    isAuth: state.auth.token !== null,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitTodoList: (token, userId) =>
      dispatch(actions.initTodoList(token, userId)),
    onRemoveItem: idItem => dispatch(actions.removeItem(idItem)),
    onAddItem: (label, token, userId) =>
      dispatch(actions.addItem(label, token, userId)),
    onToggleProperty: (prop, id) => dispatch(actions.toggleProperty(prop, id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todo);
