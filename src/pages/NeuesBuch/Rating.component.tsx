import { Form } from 'react-bootstrap';

export interface RatingUebertragung {
	rating: number;
	setRating: React.Dispatch<React.SetStateAction<number>>;
}

export function Rating(ratingUebertragung: RatingUebertragung) {
	return (
		<>
			<Form.Label>Rating (1 - 5 Sterne)</Form.Label>
			<Form.Control
				required
				type=""
				placeholder="z.B. 2"
				value={ratingUebertragung.rating}
				onChange={(event) =>
					ratingUebertragung.setRating(Number(event.target.value))
				}
			/>
		</>
	);
}
