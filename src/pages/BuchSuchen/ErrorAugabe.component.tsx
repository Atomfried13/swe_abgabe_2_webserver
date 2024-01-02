import { Alert } from 'react-bootstrap';

interface ErrorUebertragung {
	error: string;
}

export function ErrorAusgabe(errorUebertragung: ErrorUebertragung) {
	return (
		<>
			{errorUebertragung.error && (
				<Alert variant="danger" dismissible>
					<Alert.Heading>Fehler!</Alert.Heading>
					<p>{errorUebertragung.error}</p>
				</Alert>
			)}
		</>
	);
}
