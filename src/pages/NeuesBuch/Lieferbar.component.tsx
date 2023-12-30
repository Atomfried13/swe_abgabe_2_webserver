import { Form } from 'react-bootstrap';

interface LieferbarUebertragung {
	setLieferbar: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Lieferbar(lieferbarUebertragung: LieferbarUebertragung) {
	return (
		<>
			<br />
			<Form.Check
				type="checkbox"
				id="Lieferbar"
				name="Lieferbar"
				value="Lieferbar"
				label="Lieferbar"
				onChange={(event) =>
					lieferbarUebertragung.setLieferbar(event.target.checked)
				}
			/>
			<br />
		</>
	);
}
