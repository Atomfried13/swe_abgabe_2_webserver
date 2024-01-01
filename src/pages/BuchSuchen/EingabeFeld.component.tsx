import { Form } from 'react-bootstrap';

interface EingabeUebertragung {
	setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export function EingabeFeldComponent(eingabeUebertragung: EingabeUebertragung) {
	return (
		<>
			<Form.Control
				type="suchkriterien"
				placeholder="Suche anhand der ID oder des Titels..."
				onChange={(event) =>
					eingabeUebertragung.setSearchTerm(event.target.value)
				}
			/>
		</>
	);
}
