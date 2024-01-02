import { Container, Alert } from 'react-bootstrap';

export function Unauthorized() {
	return (
		<Container className="d-flex justify-content-center mt-5">
			<Alert variant={'danger'} className="text-center">
				<Alert.Heading>Zugriff verweigert</Alert.Heading>
				<p>
					Du hast keine Zugriffsrechte für diese Seite. Melde dich mit
					einem Benutzer mit der entsprechenden Rolle an.
				</p>
			</Alert>
		</Container>
	);
}
