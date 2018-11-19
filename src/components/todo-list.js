/* // JSX, который в js преобразовует babel
const el = <h1>Hello World</h1> 
// без JSX
const el = React.createElement('h1', null, 'yo'); */
import React from 'react';
import TodoListItem from './todo-list-item';

const ToDoList = () => {

	return (
		<ul>
			<li><TodoListItem /></li>
			<li><TodoListItem /></li>
		</ul>
	);
};

export default ToDoList;