import { Alert } from 'react-bootstrap';

interface ErrorUebertragung {
	error: string;
	setError: React.Dispatch<React.SetStateAction<string>>;
}

export function ErrorAusgabe(errorUebertragung: ErrorUebertragung) {
	return (
		<>
			{errorUebertragung.error && (
				<Alert
					variant="danger"
					onClose={() => errorUebertragung.setError('')}
					dismissible
				>
					<Alert.Heading>Fehler!</Alert.Heading>
					<p>{errorUebertragung.error}</p>
				</Alert>
			)}
		</>
	);
}
