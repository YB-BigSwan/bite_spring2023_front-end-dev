import { useState } from 'react';
import './App.css';
import CarList from './components/CarList';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function App() {
	return (
		<div className='App'>
			<AppBar position='static'>
				<Toolbar>
					<Typography variant='h6'>Car Info</Typography>
				</Toolbar>
			</AppBar>
			<CarList />
		</div>
	);
}

export default App;
