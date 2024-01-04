import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { EingabeFeldVerarbeitung } from './EingabeFeld/EingabeFeldVerarbeitung.component';
import { ErrorAnzeige } from './Ausgabe/ErrorAnzeige.component';
import { RadioButtonVerarbeitung } from './RadioButton/RadioButtonVerarbeitung.component';
import { CheckBoxVerarbeitung } from './CheckBox/CheckBoxVerarbeitung.component';
import './BuchSuchen.css';

export function BuchSuchen() {
	const [error, setError] = useState<string>('');

	return (
		<Container className="buchsuchen-formular">
			<EingabeFeldVerarbeitung setError={setError} />
			<ErrorAnzeige error={error} />
			<RadioButtonVerarbeitung setError={setError} />
			<CheckBoxVerarbeitung setError={setError} />
		</Container>
	);
}
