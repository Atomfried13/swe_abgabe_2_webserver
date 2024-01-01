// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable prettier/prettier */
import { useState } from 'react';
import { Form, Row, Col, Container } from 'react-bootstrap';
import './BuchSuchen.css';
import {
	fetchTitel,
	fetchId,
	Buch,
	BuchListe,
} from '../../Controller/buch-query';
import { SubmitButton } from './SubmitButtonQuery.component';
import { EingabeFeld } from './EingabeFeld.component';
import { ErrorAusgabe } from './ErrorAugabe.component';
import { ShowTableId } from './ShowTableID.component';
import { ShowTableTitel } from './ShowTableTitel.component';
import { SearchRadioButtons} from './RadioButtons';
import { SearchCheckboxId } from './CheckboxenFunktion';

export interface QueryIdAusgabe {
	buch: Buch;
}
export interface QueryTitelAusgabe {
	buecher: BuchListe;
}

// eslint-disable-next-line max-lines-per-function
export function BuchSuchen() {
	const [datenTitel, setDatenTitel] = useState<QueryTitelAusgabe | null>(
		null,
	);
	const [datenId, setDatenId] = useState<QueryIdAusgabe | null>(null);
	const [searchTerm, setSearchTerm] = useState('');
	const [error, setError] = useState('');

	const handleSearchClick = async () => {
		try {
			setError('');
			setDatenId(null);
			setDatenTitel(null);
			switch (true) {
			case searchTerm === '': {
				// '' unsicher
				setDatenTitel((await fetchTitel(searchTerm)).data.data);
				break;
			}

			case isNaN(Number(searchTerm)): {
				const { data } = await fetchTitel(searchTerm);

				if (data.errorMessage == '') {
					setDatenTitel(data.data);
				} else {
					setError(data.errorMessage);
				}
				break;
			}

			case !isNaN(Number(searchTerm)): {
				const { data } = await fetchId(searchTerm);

				if (data.errorMessage == '') {
					setDatenId(data.data);
				} else {
					setError(data.errorMessage);
				}
				break;
			}

			default:
				setError('Mach kein Scheiße, gib was Gescheites an'); //Break????
			}
		} catch (error) {
			console.error('Fehler beim Laden der Daten:', error);
			setError('Fehler beim Laden der Daten');
			throw new Error();
		}
	};

	return (
		<Container>
			<Row className="justify-content-center">
				<Col>
					<div className="d-flex align-items-center">
						<Form>
							<Form.Group
								className="buch-suchen-form"
								controlId="formGroupSuchen"
							>
								<EingabeFeld setSearchTerm={setSearchTerm} />
								<SubmitButton
									handleSearchClick={handleSearchClick}
								/>
							</Form.Group>
						</Form>
					</div>
					<Form.Group>
						<SearchRadioButtons
							setError={setError}
						/>
					</Form.Group>
					<Form.Group>
						<SearchCheckboxId setError={setError} />
					</Form.Group>
					<ErrorAusgabe error={error} setError={setError} />
					<div className="table-container">
						{datenTitel && (
							<ShowTableTitel
								datenTitel={datenTitel}
							/>
						)}
						{datenId && (
							<ShowTableId
								datenId={datenId}
								
							/>
						)}
					</div>
				</Col>
			</Row>
		</Container>
	);
}
