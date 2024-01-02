import { useState } from 'react';
import { Container } from 'react-bootstrap';
import './BuchSuchen.css';
import { Buch, BuchListe } from '../../Controller/buch-query';
import { EingabeFeld } from './EingabeFeld';
import { ErrorAusgabe } from './ErrorAugabe.component';
import { SearchRadioButtons } from './RadioButtons';
import { SearchCheckboxId } from './CheckboxenFunktion';

export interface QueryIdAusgabe {
	buch: Buch;
}

export interface QueryTitelAusgabe {
	buecher: BuchListe;
}

export function BuchSuchen() {
	const [error, setError] = useState('');

	return (
		<Container className="buchsuchen-formular">
			<EingabeFeld setError={setError} />
			<ErrorAusgabe error={error} />
			<SearchRadioButtons setError={setError} />
			<SearchCheckboxId setError={setError} />
		</Container>
	);
}
