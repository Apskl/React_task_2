import { useState, useEffect } from 'react';
import styles from './App.module.css';
import { db } from './firebase.jsx';
import { ref, onValue, push, remove } from 'firebase/database';

function App() {
	const [todos, setTodos] = useState([]);
	const [newTodo, setNewTodo] = useState('');
	const [searchTerm, setSearchTerm] = useState('');
	const [sortByAlphabet, setSortByAlphabet] = useState(false);

	useEffect(() => {
		const todosRef = ref(db, 'todos');
		onValue(todosRef, (snapshot) => {
			const data = snapshot.val();
			if (data) {
				const todoList = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
				setTodos(todoList);
			} else {
				setTodos([]);
			}
		});
	}, []);

	const addTodo = async () => {
		await push(ref(db, 'todos'), { title: newTodo });
		setNewTodo('');
	};

	const deleteTodo = async (id) => {
		await remove(ref(db, `todos/${id}`));
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
