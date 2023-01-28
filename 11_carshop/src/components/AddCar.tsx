import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

interface Car {
	brand: string;
	model: string;
	color: string;
	fuel: string;
	year: string;
	price: string;
}
interface Props {
	saveCar: (car: Car) => void;
}

export default function AddCar({ saveCar }: Props) {
	const [open, setOpen] = useState(false);
	const [car, setCar] = useState({
		brand: '',
		model: '',
		color: '',
		fuel: '',
		year: '',
		price: '',
	});

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setCar({ ...car, [event.target.name]: event.target.value });
	};

	const addCar = () => {
		saveCar(car);
		setCar({
			brand: '',
			model: '',
			color: '',
			fuel: '',
			year: '',
			price: '',
		});
		handleClose();
	};

	return (
		<div>
			<Button
				style={{ margin: 10 }}
				variant='outlined'
				onClick={handleClickOpen}>
				Add Car
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>New Car</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin='dense'
						name='brand'
						value={car.brand}
						onChange={(event) => handleChange(event)}
						label='Brand'
						fullWidth
						variant='standard'
					/>
					<TextField
						margin='dense'
						name='model'
						value={car.model}
						onChange={(event) => handleChange(event)}
						label='Model'
						fullWidth
						variant='standard'
					/>
					<TextField
						margin='dense'
						name='color'
						value={car.color}
						onChange={(event) => handleChange(event)}
						label='Color'
						fullWidth
						variant='standard'
					/>
					<TextField
						margin='dense'
						name='fuel'
						value={car.fuel}
						onChange={(event) => handleChange(event)}
						label='Fuel'
						fullWidth
						variant='standard'
					/>
					<TextField
						margin='dense'
						name='year'
						value={car.year}
						onChange={(event) => handleChange(event)}
						label='Year'
						fullWidth
						variant='standard'
					/>
					<TextField
						margin='dense'
						name='price'
						value={car.price}
						onChange={(event) => handleChange(event)}
						label='Price'
						fullWidth
						variant='standard'
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={addCar}>Save</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
