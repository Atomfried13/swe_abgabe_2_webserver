import { Form } from 'react-bootstrap';

export interface SchlagwoerterUebertragung {
	schlagwoerter: string[];
	setSchlagwoerter: React.Dispatch<React.SetStateAction<string[]>>;
}

export function Schlagwoerter(
	schlagwoerterUebertragung: SchlagwoerterUebertragung,
) {
	//TODO schlagwoerter abwählen funktioniert nicht.
	const handleSetSchlagwoerter = (schlagwort: string) => {
		if (!schlagwoerterUebertragung.schlagwoerter.includes(schlagwort)) {
			const schlagwoerteralt = schlagwoerterUebertragung.schlagwoerter;
			schlagwoerteralt.push(schlagwort);
			schlagwoerterUebertragung.setSchlagwoerter(schlagwoerteralt);
		}
	};

	return (
		<>
			<Form.Label>Schlagwoerter</Form.Label>
			<br />
			<input
				type="checkbox"
				id="TYPESCRIPT"
				name="TYPESCRIPT"
				value="TYPESCRIPT"
				onChange={() => handleSetSchlagwoerter('TYPESCRIPT')}
			/>
			<label htmlFor="TYPESCRIPT">TYPESCRIPT</label>
			<br />
			<input
				type="checkbox"
				id="JAVASCRIPT"
				name="JAVASCRIPT"
				value="JAVASCRIPT"
				onChange={() => handleSetSchlagwoerter('JAVASCRIPT')}
			/>
			<label htmlFor="JAVASCRIPT">JAVASCRIPT</label>
			<br />
		</>
	);
}
