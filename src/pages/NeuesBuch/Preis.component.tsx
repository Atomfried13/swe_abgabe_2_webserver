import { Form } from 'react-bootstrap';
import { useState } from 'react';

interface PreisProps {
	setPreis: React.Dispatch<React.SetStateAction<number>>;
}

export function Preis(preisProps: PreisProps) {
	const [preisError, setPreisError] = useState<boolean>(false);

	const handleTitelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = Number(event.target.value);

		const isValid = value > 0;
		if (isValid === true) {
			preisProps.setPreis(value);
		}
		setPreisError(!isValid);
	};

	return (
		<>
			<Form.Label>Preis*</Form.Label>
			<Form.Control
				required
				type="number"
				placeholder="z.B. 30"
				onChange={handleTitelChange}
				isInvalid={preisError}
			/>
			<Form.Control.Feedback type="invalid">
				Bitte geben Sie einen gültigen Preis ein.
			</Form.Control.Feedback>
		</>
	);
}
