/* // JSX, который в js преобразовует babel
const el = <h1>Hello World</h1> 
// без JSX
const el = React.createElement('h1', null, 'yo'); */
import React from 'react';
import TodoListItem from './todo-list-item';

const ToDoList = ({ todos }) => {

	const elements = todos.map((item) => {
		return (
			<li>
				<TodoListItem {...item} />
			</li>
		);
	});

	return (
		<ul>
			{elements}
		</ul>
	);
};

export default ToDoList;