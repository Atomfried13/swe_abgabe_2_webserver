import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './navbar.css';
import Button from 'react-bootstrap/Button';

interface Props {
	handleLogout: () => void;
  }

export function LoggedInNavbar ({ handleLogout }: Props) {
	return (
		<Navbar expand="lg">
			<Container>
				<Navbar.Brand href="#Home">Buch360</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav"/>
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link href="#Home">Home</Nav.Link>
						<Nav.Link href="#BuchSuchen">Buch Suchen</Nav.Link>
						<Nav.Link href="#NeuesBuch">Neues Buch</Nav.Link>
					</Nav>
					<Nav>
						<Button onClick={handleLogout} className="logout-btn">Logout</Button>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}