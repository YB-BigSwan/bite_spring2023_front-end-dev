import React, { useState } from 'react';
import '../App.css';

interface Todo {
	description: string;
	date: string;
}

export default function TodoList() {
	const [input, setInput] = useState({
		description: '',
		date: '',
	});
	const [todo, setTodo] = useState<Array<Todo>>([]);

	const inputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInput({ ...input, [event.target.name]: event.target.value });
	};

	const addTodo = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (input.description !== '' && input.date !== '') {
			setTodo([...todo, input]);
			setInput({ description: '', date: '' });
		}
	};

	const deleteTodo = (index: number) => {
		setTodo(todo.filter((todo, i) => i !== index));
	};

	return (
		<div>
			<h1>To-Do List</h1>
			{/* description */}
			<form onSubmit={addTodo}>
				<input
					type='text'
					name='description'
					placeholder='What do you need to do?'
					value={input.description}
					onChange={inputChanged}
				/>
				{/* date */}
				<input
					type='text'
					name='date'
					placeholder='dd.mm.yy'
					value={input.date}
					onChange={inputChanged}
				/>
				<input type='submit' value='Add to list' />
			</form>
			<table>
				<tbody>
					{todo.map((todo, index: number) => (
						<tr key={index}>
							<td id='data'>{todo.description}</td>
							<td id='data'>{todo.date}</td>
							<td>
								<input
									id='deleteButton'
									type='submit'
									value='Delete'
									onClick={() => deleteTodo(index)}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
