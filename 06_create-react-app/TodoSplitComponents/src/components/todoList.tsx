import React from 'react';
import '../App.css';

interface TodoListProps {
	todo: Array<{
		description: string;
		date: string;
	}>;
	deleteTodo: (index: number) => void;
}

const TodoList = ({ todo, deleteTodo }: TodoListProps) => {
	return (
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
	);
};

export default TodoList;
