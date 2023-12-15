import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoggedOutNavbar from './components/LoggedOutNavbar/Navbar';
import LoggedInNavbar from './components/LoggedInNavbar/Navbar';
import BuchSuchen from './pages/BuchSuchen';
import Login from './pages/Login';

function App() {

	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const handleLogin = () => {
		setIsLoggedIn(true);
	};

	const handleLogout = () => {
		setIsLoggedIn(false);
	};

	return (
		<><div>
			{isLoggedIn ? ( <LoggedInNavbar handleLogout={handleLogout}/> ) : (<LoggedOutNavbar handleLogin={handleLogin} />)}
			<BuchSuchen/>
		</div>
		<Login/></>
	);
}

export default App;
