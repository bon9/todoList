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
    props.onInitTodoList();
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
      <HeaderTodo toDo={todoCount} done={doneCount} />
      <div className="top-panel d-flex">
        <SearchPanel onSearchChange={onSearchChange} />
        <ItemStatusFilter filter={filter} onFilterChange={onFilterChange} />
      </div>

      <ToDoList
        todos={visibleItems}
        removeItem={props.onRemoveItem}
        toggleProperty={props.onToggleProperty}
      />

      <ItemAddForm onAddItem={props.onAddItem} />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    todoData: state.todo.todoData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitTodoList: () => dispatch(actions.initTodoList()),
    onRemoveItem: idItem => dispatch(actions.removeItem(idItem)),
    onAddItem: label => dispatch(actions.addItem(label)),
    onToggleProperty: (prop, id) => dispatch(actions.toggleProperty(prop, id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todo);
