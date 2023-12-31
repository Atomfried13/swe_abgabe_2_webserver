import { Button, Container, Row, Col } from 'react-bootstrap';
import './Home.css';
import { LinkContainer } from 'react-router-bootstrap';

export function Home() {
	return (
		<Container className="infos">
			<Row>
				<Col lg={{ span: 10, offset: 1 }} md={{ span: 9, offset: 2 }}>
					<h1>Willkommen zu unserem Buch Webserver</h1>
				</Col>
			</Row>
			<Row>
				<Col lg={{ span: 10, offset: 1 }} md={{ span: 9, offset: 2 }}>
					<p>
						Erhalte einen umfassenden Überblick über alle Bücher und
						verwalte deine Buchsammlung.
					</p>
				</Col>
			</Row>
			<Row className="d-flex justify-content-center">
				<Col>
					<LinkContainer to="/BuchSuchen">
						<Button className="home-suchen-btn">
							Bücher suchen
						</Button>
					</LinkContainer>
				</Col>
			</Row>
		</Container>
	);
}
