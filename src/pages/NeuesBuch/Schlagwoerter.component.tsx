import { Form } from 'react-bootstrap';

interface SchlagwoerterUebertragung {
	schlagwoerter: string[];
	setSchlagwoerter: React.Dispatch<React.SetStateAction<string[]>>;
}

export function Schlagwoerter(
	schlagwoerterUebertragung: SchlagwoerterUebertragung,
) {
	const handleSetSchlagwoerter = (schlagwort: string, checked: boolean) => {
		if (checked === true) {
			if (!schlagwoerterUebertragung.schlagwoerter.includes(schlagwort)) {
				const schlagwoerterneu =
					schlagwoerterUebertragung.schlagwoerter;
				schlagwoerterneu.push(schlagwort);
				schlagwoerterUebertragung.setSchlagwoerter(schlagwoerterneu);
			}
		} else {
			const schlagwoerterneu =
				schlagwoerterUebertragung.schlagwoerter.filter((woert) =>
					woert !== schlagwort ? woert : '',
				);
			schlagwoerterUebertragung.setSchlagwoerter(schlagwoerterneu);
		}
	};

	return (
		<>
			<br />
			<Form.Label>Schlagwoerter</Form.Label>
			<Form.Check
				type="checkbox"
				id="TYPESCRIPT"
				name="TYPESCRIPT"
				value="TYPESCRIPT"
				label="TYPESCRIPT"
				onChange={(event) =>
					handleSetSchlagwoerter('TYPESCRIPT', event.target.checked)
				}
			/>
			<Form.Check
				type="checkbox"
				id="JAVASCRIPT"
				name="JAVASCRIPT"
				value="JAVASCRIPT"
				label="JAVASCRIPT"
				onChange={(event) =>
					handleSetSchlagwoerter('JAVASCRIPT', event.target.checked)
				}
			/>
		</>
	);
}
