import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { EditOutlined } from '@mui/icons-material';

interface Car {
	brand: string;
	model: string;
	color: string;
	fuel: string;
	year: string;
	price: string;
}

export default function EditCar(props: any) {
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
		setCar({
			brand: props.car.brand,
			model: props.car.model,
			color: props.car.color,
			fuel: props.car.fuel,
			year: props.car.year,
			price: props.car.price,
		});
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

	const editCar = () => {
		props.updateCar(car, props.car._links.car.href);
		handleClose();
	};

	return (
		<div>
			<Button
				variant='outlined'
				startIcon={<EditOutlined />}
				onClick={handleClickOpen}>
				Edit Car
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Edit Car</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin='dense'
						name='brand'
						value={car.brand}
						onChange={handleChange}
						label='Brand'
						fullWidth
						variant='standard'
					/>
					<TextField
						margin='dense'
						name='model'
						value={car.model}
						onChange={handleChange}
						label='Model'
						fullWidth
						variant='standard'
					/>
					<TextField
						margin='dense'
						name='color'
						value={car.color}
						onChange={handleChange}
						label='Color'
						fullWidth
						variant='standard'
					/>
					<TextField
						margin='dense'
						name='fuel'
						value={car.fuel}
						onChange={handleChange}
						label='Fuel'
						fullWidth
						variant='standard'
					/>
					<TextField
						margin='dense'
						name='year'
						value={car.year}
						onChange={handleChange}
						label='Year'
						fullWidth
						variant='standard'
					/>
					<TextField
						margin='dense'
						name='price'
						value={car.price}
						onChange={handleChange}
						label='Price'
						fullWidth
						variant='standard'
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={editCar}>Save</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
