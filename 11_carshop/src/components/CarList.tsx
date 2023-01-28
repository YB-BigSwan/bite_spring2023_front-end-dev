import Button from '@mui/material/Button/Button';
import { useEffect, useState } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import AddCar from './AddCar';
import EditCar from './EditCar';

interface Row {
	value: string;
	[key: string]: any;
}

interface Car {
	brand: string;
	model: string;
	color: string;
	fuel: string;
	year: string;
	price: string;
}

export default function CarList() {
	const [cars, setCars] = useState([]);

	useEffect(() => fetchData(), []);

	const fetchData = () => {
		fetch('http://carrestapi.herokuapp.com/cars')
			.then((response) => response.json())
			.then((responseData) => setCars(responseData._embedded.cars));
	};

	const deleteCar = (link: string) => {
		if (window.confirm('Are you sure?')) {
			fetch(link, { method: 'DELETE' })
				.then((response) => fetchData())
				.catch((err) => console.error(err));
			alert('Car deleted!');
		} else {
			alert('Nothing deleted.');
		}
	};

	const saveCar = (car: Car) => {
		fetch('http://carrestapi.herokuapp.com/cars', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(car),
		})
			.then((response) => fetchData())
			.catch((err) => console.error(err));
	};

	const updateCar = (car: any, link: any) => {
		fetch(link, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(car),
		})
			.then((response) => fetchData())
			.catch((err) => console.error(err));
	};

	const columns = [
		{ Header: 'Brand', accessor: 'brand' },
		{ Header: 'Model', accessor: 'model' },
		{ Header: 'Color', accessor: 'color' },
		{ Header: 'Fuel', accessor: 'fuel' },
		{ Header: 'Year', accessor: 'year' },
		{ Header: 'Price', accessor: 'price' },
		{
			sortable: false,
			filterable: false,
			width: 150,
			Cell: (row: any) => <EditCar updateCar={updateCar} car={row.original} />,
		},
		{
			sortable: false,
			filterable: false,
			width: 150,
			accessor: '_links.self.href',
			Cell: (row: Row) => (
				<Button
					variant='outlined'
					color='error'
					startIcon={<DeleteIcon />}
					onClick={() => deleteCar(row.value)}>
					Delete
				</Button>
			),
		},
	];

	return (
		<div>
			<AddCar saveCar={saveCar} />
			<ReactTable filterable={true} data={cars} columns={columns} />
		</div>
	);
}
