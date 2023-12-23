import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './navbar.css';
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';

export function LoggedOutNavbar() {
	return (
		<Navbar expand="lg">
			<Container>
				<LinkContainer to="/">
					<Navbar.Brand>
						<FontAwesomeIcon icon={faBook} className="icon" />
						BuchWeb
					</Navbar.Brand>
				</LinkContainer>
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
							<Button className="login-btn">Login</Button>
						</LinkContainer>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
