import { Form } from 'react-bootstrap';

interface RatingProps {
	setRating: React.Dispatch<React.SetStateAction<number>>;
}

export function Rating(ratingProps: RatingProps) {
	return (
		<>
			<Form.Label>Sterne Rating</Form.Label>
			<Form.Select
				onChange={(event) =>
					ratingProps.setRating(Number(event.target.value))
				}
			>
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
				<option value="4">4</option>
				<option value="5">5</option>
			</Form.Select>
		</>
	);
}
