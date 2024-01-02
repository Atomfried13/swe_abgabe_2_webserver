import { Form } from 'react-bootstrap';

interface RabattUebertragung {
	setRabatt: React.Dispatch<React.SetStateAction<number>>;
}

export function Rabatt(rabattUebertragung: RabattUebertragung) {
	const handleRabatt = (value: string) => {
		const valueAlsProzent = Number(value) * 0.01;
		rabattUebertragung.setRabatt(valueAlsProzent);
	};
	return (
		<>
			<Form.Label>Rabatt (%)</Form.Label>
			<Form.Control
				type="number"
				placeholder="z.B. 10"
				onChange={(event) => handleRabatt(event.target.value)}
			/>
		</>
	);
}
