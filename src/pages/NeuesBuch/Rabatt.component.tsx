import { Form } from 'react-bootstrap';
import { useState } from 'react';

interface RabattUebertragung {
	setRabatt: React.Dispatch<React.SetStateAction<number>>;
}

export function Rabatt(rabattUebertragung: RabattUebertragung) {
	const [rabattError, setRabattError] = useState<boolean>(false);

	const handleRabatt = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = Number(event.target.value) * 0.01;

		const isValid = value > 0;
		if (isValid === true) {
			rabattUebertragung.setRabatt(value);
		}
		setRabattError(!isValid);
	};

	return (
		<>
			<Form.Label>Rabatt (%)</Form.Label>
			<Form.Control
				type="number"
				placeholder="z.B. 10"
				isInvalid={rabattError}
				onChange={handleRabatt}
			/>
			<Form.Control.Feedback type="invalid">
				Bitte geben Sie einen gültigen Rabatt ein.
			</Form.Control.Feedback>
		</>
	);
}
