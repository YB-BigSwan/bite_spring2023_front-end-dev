import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Tab, Tabs } from '@mui/material';
import { useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import './App.css';

interface Todo {
	description: string;
	date: string;
	priority: string;
}

export default function App() {
	const [input, setInput] = useState({
		description: '',
		date: '',
		priority: '',
	});
	const [todo, setTodo] = useState<Array<Todo>>([]);
	const currDate = dayjs(new Date()).format('YYYY-MM-DD');
	const [value, setValue] = useState<Dayjs | null>(dayjs(currDate));
	const [tab, setTab] = useState('one');

	let dateString: string = dayjs(value).format('DD.MM.YYYY');

	const gridRef: any = useRef(
		'https://reactjs.org/docs/hooks-reference.html#useref'
	);

	const columns: any = [
		{
			headerName: 'Description',
			field: 'description',
			sortable: true,
			filter: true,
			floatingFilter: true,
			suppressMenu: true,
		},
		{
			headerName: 'Date',
			field: 'date',
			sortable: true,
			filter: true,
			floatingFilter: true,
			suppressMenu: true,
		},
		{
			headerName: 'Priority',
			field: 'priority',
			sortable: true,
			filter: true,
			floatingFilter: true,
			suppressMenu: true,

			cellStyle: (params: any) =>
				params.value === 'High' ? { color: '#D08770' } : { color: 'black' },
		},
	];

	const inputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInput({ ...input, [event.target.name]: event.target.value });
	};

	const addTodo: any = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (
			input.description !== '' &&
			input.date !== '' &&
			input.priority !== ''
		) {
			setTodo([...todo, input]);
			setInput({ description: '', date: '', priority: '' });
		}
	};

	const deleteTodo: any = (index: number) => {
		if (gridRef.current.getSelectedNodes().length > 0) {
			setTodo(
				todo.filter(
					(todo, index) =>
						index !== gridRef.current.getSelectedNodes()[0].childIndex
				)
			);
		} else {
			alert('Select row to be deleted');
		}
	};

	const handleChange = (newValue: Dayjs | null) => {
		setValue(newValue);
		setInput({ ...input, date: dateString });
	};

	const tabChange = (event: any, tab: string) => {
		setTab(tab);
	};

	return (
		<div>
			<Tabs value={tab} onChange={tabChange}>
				<Tab value='one' label='HOME' />
				<Tab value='two' label='TODOS' />
			</Tabs>
			{tab == 'one' && (
				<div>
					<p>Welcome! Go to the TODOS tab to create a TODO list.</p>
				</div>
			)}
			{tab == 'two' && (
				<div>
					<h1>To-Do List</h1>

					<div id='inputContainer'>
						{/* description */}
						<input
							type='text'
							name='description'
							placeholder='What do you need to do?'
							value={input.description}
							onChange={inputChanged}
						/>
						{/* date */}
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DatePicker
								label='Date desktop'
								inputFormat='DD.MM.YYYY'
								value={value}
								onChange={handleChange}
								renderInput={(params) => <TextField {...params} />}
							/>
						</LocalizationProvider>

						{/* priority */}
						<input
							type='text'
							name='priority'
							placeholder='How important is this?'
							value={input.priority}
							onChange={inputChanged}
						/>
						<button className='go' onClick={addTodo}>
							Add
						</button>
						<button className='go' onClick={deleteTodo}>
							Delete
						</button>
					</div>

					<div
						className='ag-theme-material'
						style={{ height: '50vh', width: '32vw', margin: 'auto' }}>
						<AgGridReact
							ref={gridRef}
							onGridReady={(params) => (gridRef.current = params.api)}
							rowSelection='single'
							columnDefs={columns}
							rowData={todo}
							animateRows={true}
						/>
					</div>
				</div>
			)}
		</div>
	);
}
