import { Alert } from 'react-bootstrap';

interface ErrorAusgabeProps {
	error: string;
}

export function ErrorAnzeige(props: ErrorAusgabeProps) {
	return (
		<>
			{props.error && (
				<Alert variant="danger" dismissible>
					<Alert.Heading>Fehler!</Alert.Heading>
					<p>{props.error}</p>
				</Alert>
			)}
		</>
	);
}
