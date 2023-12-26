import { Form } from 'react-bootstrap';

export interface TitelUebertragung {
	titel: string;
	setTitel: React.Dispatch<React.SetStateAction<string>>;
}

export function Titel(titelUebertragung: TitelUebertragung) {
	return (
		<>
			<Form.Label>Titel</Form.Label>
			<Form.Control
				required
				type="text"
				placeholder="z.B. Learning React"
				value={titelUebertragung.titel}
				onChange={(event) =>
					titelUebertragung.setTitel(event.target.value)
				}
			/>
		</>
	);
}
