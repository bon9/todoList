import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import HeaderTodo from "./header-todo/header-todo";
import SearchPanel from "./search-panel/search-panel";
import ToDoList from "./todo-list/todo-list";
import ItemStatusFilter from "./item-status-filter/item-status-filter";
import ItemAddForm from "./item-add-form/item-add-form";
import AuthRequest from "./auth-request/auth-request";
import "./Todo.css";
import * as actions from "../../store/actions";
import axios from "../../axios-todo.js";
import withErrorHandler from "./../../hoc/withErrorHandler";

const Todo = ({
  todoData,
  isAuth,
  token,
  userId,
  onInitTodoList,
  onRemoveItem,
  onAddItem,
  onToggleProperty,
  loading,
  addLoading
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (isAuth) {
      onInitTodoList(token, userId);
    }
  }, [isAuth, onInitTodoList, token, userId]);
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
  const visibleItems = statusFilter(search(todoData, searchQuery), filter);
  const doneCount = todoData.filter(el => el.done).length;
  const todoCount = todoData.length - doneCount;

  return (
    <div className="todo-app">
      <HeaderTodo toDo={todoCount} done={doneCount} />
      <div className="top-panel d-flex">
        <SearchPanel onSearchChange={onSearchChange} />
        <ItemStatusFilter filter={filter} onFilterChange={onFilterChange} />
      </div>

      {isAuth ? (
        <>
          {todoData.length === 0 ? (
            <p>Create your first goal !!!</p>
          ) : (
            <ToDoList
              todos={visibleItems}
              removeItem={onRemoveItem}
              toggleProperty={onToggleProperty}
              token={token}
              loading={loading}
            />
          )}
          <ItemAddForm
            onAddItem={onAddItem}
            token={token}
            userId={userId}
            addLoading={addLoading}
          />
        </>
      ) : (
        <AuthRequest />
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    todoData: state.todo.todoData,
    isAuth: state.auth.token,
    token: state.auth.token,
    userId: state.auth.userId,
    addLoading: state.todo.addLoading,
    loading: state.todo.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitTodoList: (token, userId) =>
      dispatch(actions.initTodoList(token, userId)),
    onRemoveItem: (idItem, token) =>
      dispatch(actions.removeItem(idItem, token)),
    onAddItem: (label, token, userId) =>
      dispatch(actions.addItem(label, token, userId)),
    onToggleProperty: (property, id, token) =>
      dispatch(actions.toggleProperty(property, id, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Todo, axios));
