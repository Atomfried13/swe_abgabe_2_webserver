import { Form } from 'react-bootstrap';

interface EingabeFeldProps {
	setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export function EingabeFeldInput(props: EingabeFeldProps) {
	return (
		<>
			<Form.Control
				type="suchkriterien"
				placeholder="Suche anhand der ID oder des Titels..."
				onChange={(event) => props.setSearchTerm(event.target.value)}
			/>
		</>
	);
}
