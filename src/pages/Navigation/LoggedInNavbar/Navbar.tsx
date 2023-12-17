/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './navbar.css';
import Button from 'react-bootstrap/Button';
import LinkContainer from 'react-router-bootstrap';
import { NavLink } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

interface Props {
	handleLogout: () => void;
}

export function LoggedInNavbar({ handleLogout }: Props) {
	return (
		<Navbar expand="lg">
			<Container>
				<Navbar.Brand href="#Home">Buch360</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<LinkContainer to="/">
							<Nav.Link>Home</Nav.Link>
						</LinkContainer>
						<LinkContainer to="/BuchSuchen">
							<Nav.Link>Buch Suchen</Nav.Link>
						</LinkContainer>
						<LinkContainer to="/NeuesBuch">
							<Nav.Link to="/NeuesBuch" as={NavLink}>
								Neues Buch
							</Nav.Link>
						</LinkContainer>
					</Nav>
					<Nav>
						<Button onClick={handleLogout} className="logout-btn">
							Logout
						</Button>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
