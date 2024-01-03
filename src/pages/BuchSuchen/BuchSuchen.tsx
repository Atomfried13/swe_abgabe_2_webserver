import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Buch, BuchListe } from '../../Controller/buch-query';
import { EingabeFeldVerarbeitung } from './EingabeFeldVerarbeitung.component';
import { ErrorAnzeige } from './ErrorAugabe.component';
import { SearchRadioButtons } from './RadioButtons';
import { SearchCheckboxId } from './CheckboxenFunktion';
import './BuchSuchen.css';

export interface QueryIdAusgabe {
	buch: Buch;
}

export interface QueryTitelAusgabe {
	buecher: BuchListe;
}

export function BuchSuchen() {
	const [error, setError] = useState<string>('');

	return (
		<Container className="buchsuchen-formular">
			<EingabeFeldVerarbeitung setError={setError} />
			<ErrorAnzeige error={error} />
			<SearchRadioButtons setError={setError} />
			<SearchCheckboxId setError={setError} />
		</Container>
	);
}
