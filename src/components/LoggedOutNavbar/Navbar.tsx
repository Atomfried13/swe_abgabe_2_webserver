import Container from 'react-bootstrap/Container';
import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './navbar.css';
import Button from 'react-bootstrap/Button';

function BasicExample() {
	return (
		<Navbar expand="lg">
			<Container>
				<Navbar.Brand href="#home">Buch360</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link href="#Home">HOME</Nav.Link>
						<Nav.Link href="#Suche">Buch Suchen</Nav.Link>
					</Nav>
					<Nav>
						<Button className="login-btn">Login</Button>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default BasicExample;