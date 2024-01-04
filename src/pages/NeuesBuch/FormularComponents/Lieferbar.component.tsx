import { Form } from 'react-bootstrap';

interface LieferbarProps {
	setLieferbar: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Lieferbar(lieferbarProps: LieferbarProps) {
	return (
		<>
			<Form.Check
				type="checkbox"
				id="Lieferbar"
				name="Lieferbar"
				value="Lieferbar"
				label="Lieferbar"
				onChange={(event) =>
					lieferbarProps.setLieferbar(event.target.checked)
				}
			/>
		</>
	);
}
