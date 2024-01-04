import { Form } from 'react-bootstrap';
import { useState } from 'react';

interface DatumProps {
	setDatum: React.Dispatch<React.SetStateAction<string>>;
}

export function Datum(datumProps: DatumProps) {
	const [datumError, setDatumError] = useState<boolean>(false);

	const handleTitelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;

		const isValid = value.trim().length > 0;
		if (isValid === true) {
			datumProps.setDatum(value);
		}
		setDatumError(!isValid);
	};

	return (
		<>
			<Form.Label>Datum*</Form.Label>
			<Form.Control
				required
				type="date"
				onChange={handleTitelChange}
				isInvalid={datumError}
			/>
			<Form.Control.Feedback type="invalid">
				Bitte wählen Sie ein Datum aus.
			</Form.Control.Feedback>
		</>
	);
}
