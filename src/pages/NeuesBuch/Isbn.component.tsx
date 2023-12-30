import { Form } from 'react-bootstrap';

export interface IsbnUebertragung {
	isbn: string;
	setIsbn: React.Dispatch<React.SetStateAction<string>>;
}

export function Isbn(isbnUebertragung: IsbnUebertragung) {
	return (
		<>
			<Form.Label>ISBN</Form.Label>
			<Form.Control
				required
				type="text"
				placeholder="z.B. 0-0070-0644-6"
				value={isbnUebertragung.isbn}
				onChange={(event) =>
					isbnUebertragung.setIsbn(event.target.value)
				}
			/>
		</>
	);
}
