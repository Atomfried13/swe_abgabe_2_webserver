import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './navbar.css';
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../../Controller/AuthContext';
import { useContext } from 'react';

export function LoggedInNavbar() {
	const { setToken } = useContext(AuthContext);
	const { roles } = useContext(AuthContext);
	const handleLogout = () => {
		setToken(undefined);
	};

	const isAdminOrFachabteilung =
		roles?.includes('admin') ?? roles?.includes('fachabteilung');

	return (
		<Navbar expand="md">
			<Container>
				<LinkContainer to="/">
					<Navbar.Brand>
						<FontAwesomeIcon icon={faBook} className="icon" />
						BuchWeb
					</Navbar.Brand>
				</LinkContainer>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav" className="text-center">
					<Nav className="me-auto">
						<LinkContainer to="/">
							<Nav.Link>Home</Nav.Link>
						</LinkContainer>
						<LinkContainer to="/BuchSuchen">
							<Nav.Link>Buch Suchen</Nav.Link>
						</LinkContainer>
						{isAdminOrFachabteilung && (
							<LinkContainer to="/NeuesBuch">
								<Nav.Link>Neues Buch</Nav.Link>
							</LinkContainer>
						)}
					</Nav>
					<Nav>
						<LinkContainer to="/">
							<Nav.Link>
								<Button
									onClick={handleLogout}
									className="logout-btn"
								>
									Logout
								</Button>
							</Nav.Link>
						</LinkContainer>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
