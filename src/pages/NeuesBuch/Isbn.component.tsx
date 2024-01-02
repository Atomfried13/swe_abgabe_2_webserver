import { Form } from 'react-bootstrap';

interface IsbnUebertragung {
	setIsbn: React.Dispatch<React.SetStateAction<string>>;
	isbnError: boolean;
}

export function Isbn(isbnUebertragung: IsbnUebertragung) {
	return (
		<>
			<Form.Label>ISBN*</Form.Label>
			<Form.Control
				required
				type="text"
				placeholder="z.B. 0-0070-0644-6"
				onChange={(event) =>
					isbnUebertragung.setIsbn(event.target.value)
				}
				isInvalid={isbnUebertragung.isbnError}
			/>
		</>
	);
}
