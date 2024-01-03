import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Buch, BuchListe } from '../../Controller/buch-query';
import { EingabeFeldVerarbeitung } from './EingabeFeldVerarbeitung.component';
import { ErrorAnzeige } from './ErrorAnzeige.component';
import { RadioButtonVerarbeitung } from './RadioButtonVerarbeitung.component';
import { CheckBoxVerarbeitung } from './CheckBoxVerarbeitung.component';
import './BuchSuchen.css';

export interface QueryIdDaten {
	buch: Buch;
}

export interface QueryTitelDaten {
	buecher: BuchListe;
}

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
