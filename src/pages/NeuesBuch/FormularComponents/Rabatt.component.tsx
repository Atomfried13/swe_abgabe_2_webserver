import { Form } from 'react-bootstrap';
import { useState } from 'react';

interface RabattProps {
	setRabatt: React.Dispatch<React.SetStateAction<number>>;
}

export function Rabatt(rabattProps: RabattProps) {
	const [rabattError, setRabattError] = useState<boolean>(false);

	const handleRabatt = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = Number(event.target.value) * 0.01;
		const isValid = value > 0;

		if (isValid === true) {
			rabattProps.setRabatt(value);
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
