import { Form, InputGroup } from 'react-bootstrap';
import { useState } from 'react';

interface IsbnUebertragung {
	setIsbn: React.Dispatch<React.SetStateAction<string>>;
}

export function Isbn(isbnUebertragung: IsbnUebertragung) {
	const [isbnError, setIsbnError] = useState<boolean>(false);

	const handleTitelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;

		const isValid = value.trim().length > 0;
		if (isValid === true) {
			isbnUebertragung.setIsbn(value);
		}
		setIsbnError(!isValid);
	};

	return (
		<>
			<Form.Label>ISBN*</Form.Label>
			<InputGroup>
				<Form.Control
					required
					type="text"
					placeholder="z.B. 0-0070-0644-6"
					onChange={handleTitelChange}
					isInvalid={isbnError}
				/>
				<Form.Control.Feedback type="invalid">
					Bitte geben Sie eine gültige ISBN ein.
				</Form.Control.Feedback>
			</InputGroup>
		</>
	);
}
