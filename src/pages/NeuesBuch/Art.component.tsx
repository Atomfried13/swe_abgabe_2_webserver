import { Form } from 'react-bootstrap';

interface ArtProps {
	setArt: React.Dispatch<React.SetStateAction<string>>;
}

export function Art(artProps: ArtProps) {
	return (
		<>
			<Form.Check
				type="radio"
				id="DRUCKAUSGABE"
				name="Art"
				value="DRUCKAUSGABE"
				label="DRUCKAUSGABE"
				defaultChecked
				onChange={(event) => artProps.setArt(event.target.value)}
			/>
			<Form.Check
				type="radio"
				id="KINDLE"
				name="Art"
				value="KINDLE"
				label="KINDLE"
				onChange={(event) => artProps.setArt(event.target.value)}
			/>
		</>
	);
}
