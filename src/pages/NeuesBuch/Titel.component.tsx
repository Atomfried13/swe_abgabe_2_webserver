import { Form } from 'react-bootstrap';

export interface TitelUebertragung {
	setTitel: React.Dispatch<React.SetStateAction<string>>;
}

export function Titel(titelUebertragung: TitelUebertragung) {
	return (
		<>
			<Form.Label>Titel*</Form.Label>
			<Form.Control
				required
				type="text"
				placeholder="z.B. Learning React"
				onChange={(event) =>
					titelUebertragung.setTitel(event.target.value)
				}
			/>
		</>
	);
}
