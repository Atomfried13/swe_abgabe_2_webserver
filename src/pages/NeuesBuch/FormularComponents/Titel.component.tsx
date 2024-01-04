import { Form } from 'react-bootstrap';
import { useState } from 'react';

interface TitelProps {
	setTitel: React.Dispatch<React.SetStateAction<string>>;
}

export function Titel(titelProps: TitelProps) {
	const [titelError, setTitelError] = useState<boolean>(false);

	const handleTitelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		const isValid = value.trim().length > 0;

		if (isValid === true) {
			titelProps.setTitel(value);
		}

		setTitelError(!isValid);
	};

	return (
		<>
			<Form.Label>Titel*</Form.Label>
			<Form.Control
				required
				type="text"
				placeholder="z.B. Learning React"
				onChange={handleTitelChange}
				isInvalid={titelError}
			/>
			<Form.Control.Feedback type="invalid">
				Bitte geben Sie einen Titel ein.
			</Form.Control.Feedback>
		</>
	);
}
