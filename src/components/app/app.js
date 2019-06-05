import React, { useState } from "react";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import ToDoList from "../todo-list";
import ItemStatusFilter from "../item-status-filter";
import ItemAddForm from "../item-add-form";
import "./app.css";

export default function App(props) {
  const [todoData, setTodoData] = useState([
    { label: "Coffee", important: false, done: false, id: 100 },
    { label: "Make Awesome App", important: false, done: false, id: 101 },
    { label: "Have a lunch", important: false, done: false, id: 102 }
  ]);
  const [term, setTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [maxID, setMaxId] = useState(103);

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
    // const newArray = todoData.filter(item => item.id !== id); //как вариант можно так, но возможно это дольше из за перебора всех элементов
    setTodoData(newArray);
  };

  const addItem = text => {
    const newItem = createTodoItem(text);

    const newArray = [...todoData, newItem];

    setTodoData(newArray);
  };

  const toggleProperty = (arr, id, propName) => {
    // idx индекс меняемой записи
    const idx = arr.findIndex(el => el.id === id);
    // 1. update object
    const oldItem = arr[idx];
    // [propName] будет сразу то что пришло, т.е. all, active..: !текущему значению
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };
    // 2. construct newarray
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
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
  const doneCount = todoData.filter(el => el.done).length;
  const todoCount = todoData.length - doneCount;

  return (
    <div className="todo-app">
      <AppHeader toDo={todoCount} done={doneCount} />
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
