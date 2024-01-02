import { Form } from 'react-bootstrap';

interface DatumUebertragung {
	setDatum: React.Dispatch<React.SetStateAction<string>>;
}

export function Datum(datumUebertragung: DatumUebertragung) {
	return (
		<>
			<Form.Label>Datum*</Form.Label>
			<Form.Control
				required
				type="date"
				onChange={(event) =>
					datumUebertragung.setDatum(event.target.value)
				}
			/>
		</>
	);
}
