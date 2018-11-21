import React from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import ToDoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import "./app.css"

const App = () => {

	const todoData = [
		{ label: 'Drink Coffee', important: false, id: 1 },
		{ label: 'Make Awesome App', important: false, id: 2 },
		{ label: 'Have a lunch', important: true, id: 3 }
	];

	return (
		<div className="todo-app">
			<AppHeader toDo={1} done={3} />
			<div className="top-panel d-flex">
				<SearchPanel />
				<ItemStatusFilter />
			</div>

			<ToDoList todos={todoData} />
		</div>
	);
};

export default App;