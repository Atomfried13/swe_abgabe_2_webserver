import { Form } from 'react-bootstrap';

export interface PreisUebertragung {
	setPreis: React.Dispatch<React.SetStateAction<number>>;
}

export function Preis(preisUebertragung: PreisUebertragung) {
	return (
		<>
			<Form.Label>Preis*</Form.Label>
			<Form.Control
				required
				type=""
				placeholder="z.B. 30"
				onChange={(event) =>
					preisUebertragung.setPreis(Number(event.target.value))
				}
			/>
		</>
	);
}
