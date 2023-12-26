import { Form } from 'react-bootstrap';

export interface RatingUebertragung {
	rating: number | undefined;
	setRating: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export function Rating(ratingUeertragung: RatingUebertragung) {
	return (
		<>
			<Form.Label>Rating (1 - 5 Sterne)</Form.Label>
			<Form.Control
				type=""
				placeholder="z.B. 2"
				value={ratingUeertragung.rating}
				onChange={(event) =>
					ratingUeertragung.setRating(Number(event.target.value))
				}
			/>
		</>
	);
}
