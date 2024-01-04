import { Form } from 'react-bootstrap';

interface SchlagwoerterProps {
	schlagwoerter: string[];
	setSchlagwoerter: React.Dispatch<React.SetStateAction<string[]>>;
}

export function Schlagwoerter(schlagwoerterProps: SchlagwoerterProps) {
	const handleSetSchlagwoerter = (schlagwort: string, checked: boolean) => {
		if (checked === true) {
			if (!schlagwoerterProps.schlagwoerter.includes(schlagwort)) {
				const schlagwoerterneu = schlagwoerterProps.schlagwoerter;
				schlagwoerterneu.push(schlagwort);

				schlagwoerterProps.setSchlagwoerter(schlagwoerterneu);
			}
		} else {
			const schlagwoerterneu = schlagwoerterProps.schlagwoerter.filter(
				(woert) => (woert !== schlagwort ? woert : ''),
			);

			schlagwoerterProps.setSchlagwoerter(schlagwoerterneu);
		}
	};

	return (
		<>
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
