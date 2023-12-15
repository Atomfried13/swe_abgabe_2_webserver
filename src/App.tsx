//app
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoggedOutNavbar from './components/LoggedOutNavbar/Navbar';
import BuchSuchen from './pages/BuchSuchen';
import Login from './pages/Login';
import Einloggen from './pages/auth.service';

function App() {
	const [isLoginModalOpen, setLoginModalOpen] = useState(false);

	const openLoginModal = () => {
		setLoginModalOpen(true);
	};

	const closeLoginModal = () => {
		setLoginModalOpen(false);
	};

	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const Einloggenclick = async (username: string, password: string) => {
		const success = await Einloggen(username, password);
		setIsLoggedIn(success);
		closeLoginModal();
	  };

	return (
		<div>
			<BuchSuchen />
			<LoggedOutNavbar onLoginClick={openLoginModal} />
			{isLoginModalOpen && <Login onLogin={Einloggenclick} onClose={closeLoginModal} />}
			<div className="login-status">
				{isLoggedIn ? 'Erfolgreich eingeloggt!' : 'Fehler beim Einloggen.'}
			</div>
		</div>
	);
}

export default App;
