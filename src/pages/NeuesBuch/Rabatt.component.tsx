import { Form } from 'react-bootstrap';

export interface RabattUebertragung {
	setRabatt: React.Dispatch<React.SetStateAction<number>>;
}

export function Rabatt(rabattUebertragung: RabattUebertragung) {
	const handleRabatt = (value: string) => {
		const valueAlsProzent = Number(value) * 0.01;
		rabattUebertragung.setRabatt(valueAlsProzent);
	};
	return (
		<>
			<Form.Label>Rabatt (in Prozent)*</Form.Label>
			<Form.Control
				required
				type="int"
				placeholder="z.B. 10"
				onChange={(event) => handleRabatt(event.target.value)}
			/>
		</>
	);
}
