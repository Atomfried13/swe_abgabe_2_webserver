import { Form } from 'react-bootstrap';

interface UnterTitelProps {
	setUnterTitel: React.Dispatch<React.SetStateAction<string>>;
}

export function UnterTitel(unterTitelProps: UnterTitelProps) {
	return (
		<>
			<Form.Label>Untertitel</Form.Label>
			<Form.Control
				type="text"
				placeholder="Das Verlorene Schloss"
				onChange={(event) =>
					unterTitelProps.setUnterTitel(event.target.value)
				}
			/>
		</>
	);
}
