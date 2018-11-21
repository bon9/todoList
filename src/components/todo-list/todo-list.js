/* // JSX, который в js преобразовует babel
const el = <h1>Hello World</h1> 
// без JSX
const el = React.createElement('h1', null, 'yo'); */
import React from 'react';
import TodoListItem from '../todo-list-item';
import './todo-list.css';

const ToDoList = ({ todos }) => {

	const elements = todos.map((item) => {

		const { id, ...itemProps } = item;

		return (
			<li key={id} className="list-group-item">
				<TodoListItem {...itemProps} />
			</li>
		);
	});

	return (
		<ul className="list-group todo-list">
			{elements}
		</ul>
	);
};

export default ToDoList;