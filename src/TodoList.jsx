import { useState, useEffect } from 'react';
import styles from './App.module.css';

function App() {
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/todos')
			.then((response) => response.json())
			.then((data) => setTodos(data))
			.catch((error) => console.log('error', error));
	}, []);

	return (
		<div className={styles.App}>
			<h1>Todo List</h1>
			<ul>
				{todos.map((todo) => (
					<li key={todo.id}>{todo.title}</li>
				))}
			</ul>
		</div>
	);
}

export default App;
