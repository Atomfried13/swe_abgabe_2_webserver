import { Form } from 'react-bootstrap';

interface EingabeFeldProps {
	setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export function EingabeFeldInput(props: EingabeFeldProps) {
	return (
		<>
			<Form.Control
				type="suchkriterien"
				placeholder="Suche anhand der ID, des Titels oder des Teiltitels"
				onChange={(event) => props.setSearchTerm(event.target.value)}
			/>
		</>
	);
}
