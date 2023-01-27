import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Home } from './components/home';
import { About } from './components/about';
import { Contact } from './components/contact';

function App() {
	return (
		<>
			<h1>React Router Exercise</h1>

			<Link to='/'>Home </Link>

			<Link to='/about'>About </Link>

			<Link to='/contact'>Contact </Link>

			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/about' element={<About />} />
				<Route path='/contact' element={<Contact />} />
			</Routes>
		</>
	);
}

export default App;
