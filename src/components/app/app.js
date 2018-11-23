import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import ToDoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import "./app.css"

export default class App extends Component {

	constructor() {
		super();
		this.deleteItem = this.deleteItem.bind(this);
	}

	state = {
		todoData: [
			{ label: 'Drink Coffee', important: false, id: 1 },
			{ label: 'Make Awesome App', important: false, id: 2 },
			{ label: 'Have a lunch', important: true, id: 3 }
		]
	};

	deleteItem(id) {
		this.setState(({ todoData }) => {
			const idx = todoData.findIndex((el) => el.id === id);

			const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
			// const newArray = todoData.filter(item => item.id !== id); //как вариант можно так, но возможно это дольше из за перебора всех элементов

			return {
				todoData: newArray
			};
		});
	}

	render() {
		return (
			<div className="todo-app">
				<AppHeader toDo={1} done={3} />
				<div className="top-panel d-flex">
					<SearchPanel />
					<ItemStatusFilter />
				</div>

				<ToDoList
					todos={this.state.todoData}
					onDeleted={this.deleteItem} />
			</div>
		);
	}
}