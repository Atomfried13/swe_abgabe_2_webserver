import { useState } from 'react';
import { Form, Row, Col, Container } from 'react-bootstrap';
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

// eslint-disable-next-line max-lines-per-function
export function BuchSuchen() {
	const [error, setError] = useState('');

	return (
		<Container className="buchsuchen-formular">
			<Row className="justify-content-center">
				<EingabeFeld setError={setError} />
				<SearchRadioButtons setError={setError} />
				<SearchCheckboxId setError={setError} />
				<ErrorAusgabe error={error} setError={setError} />
			</Row>
		</Container>
	);
}
