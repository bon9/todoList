import React from 'react';
import ReactDOM from 'react-dom';

/* // JSX, который в js преобразовует babel
const el = <h1>Hello World</h1> 
// без JSX
const el = React.createElement('h1', null, 'yo'); */

const ToDoList = () => {

	const items = ['Drink Coffee', 'Build Awesome App']
	return (
		<ul>
			<li>{items[0]}</li>
			<li>{items[1]}</li>
		</ul>
	);
};

const AppHeader = () => <h1> My ToDo List </h1>;

const SearchPanel = () => {

	const searchText = 'Type here to search';
	const searchStyle = { fontSize: '25px' };

	return <input
		style={searchStyle}
		placeholder={searchText} />;
};

const App = () => {

	return (
		<div>
			<AppHeader />
			<ToDoList />
			<SearchPanel />
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));