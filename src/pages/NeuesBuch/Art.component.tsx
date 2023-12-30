import { Form } from 'react-bootstrap';

interface ArtUebertragung {
	setArt: React.Dispatch<React.SetStateAction<string>>;
}

export function Art(artUebertragung: ArtUebertragung) {
	return (
		<>
			<br />
			<Form.Check
				type="radio"
				id="DRUCKAUSGABE"
				name="Art"
				value="DRUCKAUSGABE"
				label="DRUCKAUSGABE"
				defaultChecked
				onChange={(event) => artUebertragung.setArt(event.target.value)}
			/>
			<Form.Check
				type="radio"
				id="KINDLE"
				name="Art"
				value="KINDLE"
				label="KINDLE"
				onChange={(event) => artUebertragung.setArt(event.target.value)}
			/>
		</>
	);
}
