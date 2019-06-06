import React, { useState, useEffect, useReducer } from "react";

import axios from "../../axios-todo";
import HeaderTodo from "./header-todo/header-todo";
import SearchPanel from "./search-panel/search-panel";
import ToDoList from "./todo-list/todo-list";
import ItemStatusFilter from "./item-status-filter/item-status-filter";
import ItemAddForm from "./item-add-form/item-add-form";
import "./Todo.css";

export default function Todo() {
  const [todoData, setTodoData] = useState([]);
  const [term, setTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [maxID, setMaxId] = useState(103);

  // const todoListReducer = (state, action) => {
  //     switch (action.type) {
  //       case "ADD":
  //         return state.concat(action.payload);
  //       case "REMOVE":
  //         return state.filter(todo => todo.id !== action.payload);
  //       case "SET":
  //         return action.payload;
  //       default:
  //         return state;
  //     }
  //   };

  //   const [todoList, dispatch] = useReducer(todoListReducer, []);

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
      setTodoData(todos);
    });
  }, []);

  const createTodoItem = label => {
    setMaxId(maxID + 1);
    return {
      label,
      important: false,
      done: false,
      id: maxID
    };
  };

  const deleteItem = id => {
    const idx = todoData.findIndex(el => el.id === id);
    const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
    axios
      .delete(`todos/${id}.json`)
      .then(res => {
        setTodoData(newArray);
      })
      .catch(err => console.log(err));
    // const newArray = todoData.filter(item => item.id !== id); //как вариант можно так, но возможно это дольше из за перебора всех элементов
  };

  const addItem = text => {
    const newItem = createTodoItem(text);
    const newArray = [...todoData, newItem];
    axios
      .post("todos.json", newItem)
      .then(res => {
        setTodoData(newArray);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const toggleProperty = (arr, id, propName) => {
    // idx меняемой записи
    const idx = arr.findIndex(el => el.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };
    axios
      .patch(`todos/${oldItem.id}.json`, { [propName]: !oldItem[propName] })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
    // 2. construct newarray
  };

  const onToggleDone = id => {
    setTodoData(toggleProperty(todoData, id, "done"));
  };

  const onToggleImportant = id => {
    setTodoData(toggleProperty(todoData, id, "important"));
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
  console.log(todoData);
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
