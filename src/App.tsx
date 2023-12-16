/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-unused-vars */
//app
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LoggedOutNavbar } from './components/LoggedOutNavbar/Navbar';
import { LoggedInNavbar } from './components/LoggedInNavbar/Navbar';
import { BuchSuchen } from './pages/BuchSuchen/BuchSuchen';
import { Login } from './pages/Login/Login';
import { NeuesBuch } from './pages/NeuesBuch/NeuesBuch';
import { Einloggen } from './pages/auth.service';

export function App() {
	const [isLoginModalOpen, setLoginModalOpen] = useState(false);

	const openLoginModal = () => {
		setLoginModalOpen(true);
	};

	const closeLoginModal = () => {
		setLoginModalOpen(false);
	};

	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const einloggenClick = async (username: string, password: string) => {
		const success = await Einloggen(username, password);
		setIsLoggedIn(success);
		closeLoginModal();
	};

	return (
		<div>
			<LoggedInNavbar
				handleLogout={function (): void {
					throw new Error('Function not implemented.');
				}}
			/>
			<NeuesBuch />
		</div>
	);
}
