import { useState } from 'react';
import { LoggedInNavbar } from './LoggedInNavbar/Navbar';
import { LoggedOutNavbar } from './LoggedOutNavbar/Navbar';
import { token } from '../../Controller/auth.service';

export function Nav() {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(
		token !== undefined && token !== null,
	);

	const handleLogin = () => {
		setIsLoggedIn(true);
	};

	const handleLogout = () => {
		setIsLoggedIn(false);
	};

	return (
		<>
			{isLoggedIn ? (
				<LoggedInNavbar handleLogout={handleLogout} />
			) : (
				<LoggedOutNavbar handleLogin={handleLogin} />
			)}
		</>
	);
}
