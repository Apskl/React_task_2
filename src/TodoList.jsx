import { useState, useEffect } from 'react';
import styles from './App.module.css';

function App() {
	const [todos, setTodos] = useState([]);
	const [newTodo, setNewTodo] = useState('');
	const [searchTerm, setSearchTerm] = useState('');
	const [sortByAlphabet, setSortByAlphabet] = useState(false);

	useEffect(() => {
		fetch('http://localhost:3001/todos')
			.then((response) => response.json())
			.then((data) => setTodos(data))
			.catch((error) => console.log('error', error));
	}, []);

	const addTodo = async () => {
		const response = await fetch('http://localhost:3001/todos', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ title: newTodo }),
		});
		const data = await response.json();
		setTodos([...todos, data]);
		setNewTodo('');
	};

	const deleteTodo = async (id) => {
		await fetch(`http://localhost:3001/todos/${id}`, {
			method: 'DELETE',
		});
		setTodos(todos.filter((todo) => todo.id !== id));
	};

	const handleSearch = (event) => {
		setSearchTerm(event.target.value);
	};

	const filteredTodos = todos.filter((todo) => todo.title.toLowerCase().includes(searchTerm.toLowerCase()));

	const sortedTodos = sortByAlphabet ? filteredTodos.slice().sort((a, b) => a.title.localeCompare(b.title)) : filteredTodos;

	return (
		<div className={styles.App}>
			<h1>Todo List</h1>
			<input type="text" placeholder="Поиск" value={searchTerm} onChange={handleSearch} />
			<button onClick={() => setSortByAlphabet(!sortByAlphabet)}>Сортировка по алфавиту</button>
			<ul>
				{sortedTodos.map((todo) => (
					<li key={todo.id}>
						{todo.title}
						<button onClick={() => deleteTodo(todo.id)}>Удалить задачу</button>
					</li>
				))}
			</ul>
			<input type="text" placeholder="Задача" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
			<button onClick={addTodo}>Добавить задачу</button>
		</div>
	);
}

export default App;
