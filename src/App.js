import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import TodoList from './components/TodoList';
import './App.css';

function App() {
	const [inputText, setInputText] = useState('');
	const [todos, setTodos] = useState([]);
	const [filter, setFilter] = useState('all');
	const [filteredTodos, setFilteredTodos] = useState([]);

	const getLocalTodos = () => {
		if (localStorage.getItem('todos') === null) {
			localStorage.setItem('todos', JSON.stringify([]));
		} else {
			let fetchedTodos = JSON.parse(localStorage.getItem('todos'));
			setTodos(fetchedTodos);
		}
	};

	useEffect(() => {
		getLocalTodos();
	}, []);

	useEffect(() => {
		const filterHandler = () => {
			switch (filter) {
				case 'completed':
					setFilteredTodos(todos.filter((todo) => todo.completed === true));
					break;
				case 'uncompleted':
					setFilteredTodos(todos.filter((todo) => todo.completed === false));
					break;
				default:
					setFilteredTodos(todos);
					break;
			}
		};
		const saveToLocalStorage = () => {
			localStorage.setItem('todos', JSON.stringify(todos));
		};
		filterHandler();
		saveToLocalStorage();
	}, [todos, filter]);

	return (
		<div className='App'>
			<header>
				<h1>Todo List</h1>
			</header>
			<Form
				todos={todos}
				setTodos={setTodos}
				setInputText={setInputText}
				inputText={inputText}
				setFilter={setFilter}
			/>
			<TodoList
				todos={todos}
				setTodos={setTodos}
				filteredTodos={filteredTodos}
			/>
		</div>
	);
}

export default App;
