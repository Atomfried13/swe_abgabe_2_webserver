import { Form } from 'react-bootstrap';

export interface DatumUebertragung {
	datum: string;
	setDatum: React.Dispatch<React.SetStateAction<string>>;
}

export function Datum(datumUebertragung: DatumUebertragung) {
	return (
		<>
			<Form.Label>Datum</Form.Label>
			<Form.Control
				type="text"
				placeholder="2021-01-31"
				value={datumUebertragung.datum}
				onChange={(event) =>
					datumUebertragung.setDatum(event.target.value)
				}
			/>
		</>
	);
}
