import { Alert } from 'react-bootstrap';

export function Unauthorized() {
	return (
		<Alert variant={'danger'} className="text-center">
			Keine Zugriffsrechte für diese Seite
		</Alert>
	);
}
