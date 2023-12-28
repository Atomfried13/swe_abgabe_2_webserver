import { Form } from 'react-bootstrap';

export interface UnterTitelUebertragung {
	setUnterTitel: React.Dispatch<React.SetStateAction<string>>;
}

export function UnterTitel(unterTitelUebertragung: UnterTitelUebertragung) {
	return (
		<>
			<Form.Label>Untertitel</Form.Label>
			<Form.Control
				type="text"
				placeholder="Das Verlorene Schloss"
				onChange={(event) =>
					unterTitelUebertragung.setUnterTitel(event.target.value)
				}
			/>
		</>
	);
}
