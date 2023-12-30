import { useContext } from 'react';
import { LoggedInNavbar } from './LoggedInNavbar/Navbar';
import { LoggedOutNavbar } from './LoggedOutNavbar/Navbar';
import { AuthContext } from '../../Controller/AuthContext';

export function Nav() {
	const { token } = useContext(AuthContext);

	return (
		<>{token !== undefined ? <LoggedInNavbar /> : <LoggedOutNavbar />}</>
	);
}
