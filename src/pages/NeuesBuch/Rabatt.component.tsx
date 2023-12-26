import { Form } from 'react-bootstrap';

export interface RabattUebertragung {
	rabatt: number | undefined;
	setRabatt: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export function Rabatt(rabattUebertragung: RabattUebertragung) {
	return (
		<>
			<Form.Label>Rabatt (in Prozent)</Form.Label>
			<Form.Control
				required
				type="text"
				placeholder="z.B. 10"
				value={rabattUebertragung.rabatt}
				onChange={(event) =>
					rabattUebertragung.setRabatt(Number(event.target.value))
				}
			/>
		</>
	);
}
