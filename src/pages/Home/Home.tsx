import { Button } from 'react-bootstrap';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext } from 'react';
import { AuthContext } from '../../Controller/AuthContext';

export function Home() {
	const { token } = useContext(AuthContext);
	console.log('Aktueller Wert des Tokens:', token);
	return (
		<div>
			<div className="infos">
				<h1>Willkommen zu unserem Buch Webserver</h1>
				<p>
					Erhalte einen umfassenden Überblick über alle Bücher und
					verwalte deine Buchsammlung.
				</p>
				<LinkContainer to="/BuchSuchen">
					<Button type="submit" className="suchen-btn">
						Bücher suchen
					</Button>
				</LinkContainer>
			</div>
		</div>
	);
}
