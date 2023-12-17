import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './navbar.css';
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';

interface LoggedOutNavbarClick {
	onLoginClick: () => void;
}

export function LoggedOutNavbar({ onLoginClick }: LoggedOutNavbarClick) {
	return (
		<Navbar expand="lg">
			<Container>
				<Navbar.Brand href="#home">Buch360</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<LinkContainer to="/">
							<Nav.Link>Home</Nav.Link>
						</LinkContainer>
						<LinkContainer to="/BuchSuchen">
							<Nav.Link>Buch Suchen</Nav.Link>
						</LinkContainer>
					</Nav>
					<Nav>
						<LinkContainer to="/Login">
							<Button
								className="login-btn"
								onClick={onLoginClick}
							>
								Login
							</Button>
						</LinkContainer>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
