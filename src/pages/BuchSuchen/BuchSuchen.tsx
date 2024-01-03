import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Buch, BuchListe } from '../../Controller/buch-query';
import { EingabeFeldVerarbeitung } from './EingabeFeldVerarbeitung.component';
import { ErrorAnzeige } from './ErrorAugabe.component';
import { RadioButtonSuche } from './RadioButtonSuche';
import { SearchCheckboxId } from './CheckboxenFunktion';
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
			<RadioButtonSuche setError={setError} />
			<SearchCheckboxId setError={setError} />
		</Container>
	);
}
