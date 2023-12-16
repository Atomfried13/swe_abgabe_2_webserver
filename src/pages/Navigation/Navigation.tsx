import { Login } from '../Login/Login';
import { LoggedInNavbar } from './LoggedInNavbar/Navbar';
import { LoggedOutNavbar } from './LoggedOutNavbar/Navbar';
import { token } from '../../Controller/auth.service';

export function Nav() {
	if (token === undefined) {
		return (
			<>
				<LoggedOutNavbar
					onLoginClick={function () {
						return <Login />;
					}}
				/>
			</>
		);
	} else {
		return (
			<LoggedInNavbar
				handleLogout={function (): void {
					throw new Error('Function not implemented.');
				}}
			/>
		);
	}
}
