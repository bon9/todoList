import React, { useState, useEffect, useReducer } from "react";

import axios from "../../axios-todo";
import HeaderTodo from "./header-todo/header-todo";
import SearchPanel from "./search-panel/search-panel";
import ToDoList from "./todo-list/todo-list";
import ItemStatusFilter from "./item-status-filter/item-status-filter";
import ItemAddForm from "./item-add-form/item-add-form";
import "./Todo.css";

export default function Todo(props) {
  // const [todoData, setTodoData] = useState([]);
  const [term, setTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const todoListReducer = (state, action) => {
    switch (action.type) {
      case "ADD":
        return state.concat(action.payload);
      case "DELETE":
        return state.filter(todo => todo.id !== action.payload);
      case "SET":
        return action.payload;
      case "TOGGLE":
        return [
          ...state.slice(0, action.payload.idx),
          action.payload.newItem,
          ...state.slice(action.payload.idx + 1)
        ];
      default:
        return state;
    }
  };

  const [todoData, dispatch] = useReducer(todoListReducer, []);

  useEffect(() => {
    axios.get("todos.json").then(res => {
      const resTodoData = res.data;
      const todos = [];
      for (const key in resTodoData) {
        todos.push({
          done: resTodoData[key].done,
          id: key,
          important: resTodoData[key].important,
          label: resTodoData[key].label
        });
      }
      dispatch({ type: "SET", payload: todos });
    });
  }, []);

  const deleteItem = id => {
    //const idx = todoData.findIndex(el => el.id === id);
    // const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
    axios
      .delete(`todos/${id}.json`)
      .then(res => {
        dispatch({ type: "DELETE", payload: id });
      })
      .catch(err => console.log(err));
    // const newArray = todoData.filter(item => item.id !== id); //как вариант можно так, но возможно это дольше из за перебора всех элементов
  };

  const addItem = text => {
    const createItem = {
      label: text,
      important: false,
      done: false
    };
    axios
      .post("todos.json", createItem)
      .then(res => {
        const newItem = { ...createItem, id: res.data.name };
        dispatch({ type: "ADD", payload: newItem });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const toggleProperty = (id, propName) => {
    const idx = todoData.findIndex(el => el.id === id);
    const oldItem = todoData[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };
    axios
      .patch(`todos/${oldItem.id}.json`, { [propName]: !oldItem[propName] })
      .then(res => {
        dispatch({ type: "TOGGLE", payload: { newItem: newItem, idx: idx } });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const onToggleDone = id => {
    toggleProperty(id, "done");
  };

  const onToggleImportant = id => {
    toggleProperty(id, "important");
  };

  const onSearchChange = term => {
    setTerm(term);
  };

  const onFilterChange = filter => {
    setFilter(filter);
  };

  const search = (items, term) => {
    if (term.length === 0) {
      return items;
    }
    // оставит только item, для которых вернулось true
    return items.filter(item => {
      // вернет true, если найдет term в item
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
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
  const visibleItems = statusFilter(search(todoData, term), filter);
  const doneCount = todoData.filter(el => el.done).length;
  const todoCount = todoData.length - doneCount;

  return (
    <div className="todo-app">
      <HeaderTodo toDo={todoCount} done={doneCount} />
      <div className="top-panel d-flex">
        <SearchPanel onSearchChange={onSearchChange} />
        <ItemStatusFilter filter={filter} onFilterChange={onFilterChange} />
      </div>

      <ToDoList
        todos={visibleItems}
        onDeleted={deleteItem}
        onToggleImportant={onToggleImportant}
        onToggleDone={onToggleDone}
      />

      <ItemAddForm onItemAdded={addItem} />
    </div>
  );
}
