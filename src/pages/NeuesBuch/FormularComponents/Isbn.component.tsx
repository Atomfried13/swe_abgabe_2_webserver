import { Form } from 'react-bootstrap';
import { useState } from 'react';

interface IsbnProps {
	setIsbn: React.Dispatch<React.SetStateAction<string>>;
}

export function Isbn(isbnProps: IsbnProps) {
	const [isbnError, setIsbnError] = useState<boolean>(false);

	const handleIsbnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		const isValid = value.trim().length > 0;

		if (isValid === true) {
			isbnProps.setIsbn(value);
		}

		setIsbnError(!isValid);
	};

	return (
		<>
			<Form.Label>ISBN*</Form.Label>
			<Form.Control
				required
				type="text"
				placeholder="z.B. 0-0070-0644-6"
				onChange={handleIsbnChange}
				isInvalid={isbnError}
			/>
			<Form.Control.Feedback type="invalid">
				Bitte geben Sie eine gültige ISBN ein.
			</Form.Control.Feedback>
		</>
	);
}
