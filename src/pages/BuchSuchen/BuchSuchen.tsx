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
import { ModalUbertragung } from './Modal.component';
import { ErrorAusgabe } from './ErrorAugabe.component';
import { ShowTableId } from './ShowTableID.component';
import { ShowTableTitel } from './ShowTableTitel.component';

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
	const [showTableTitel, setShowTableTitel] = useState(false);
	const [showTableId, setShowTableId] = useState(false);
	const [error, setError] = useState('');
	const [selectedBook, setSelectedBook] = useState<Buch | null>(null);
	const [showModal, setShowModal] = useState(false);

	// eslint-disable-next-line max-statements
	const handleSearchClick = async () => {
		try {
			switch (true) {
			case searchTerm === '': // '' unsicher
				setDatenTitel(await fetchTitel(searchTerm));
				setError('');
				setShowTableId(false);
				setShowTableTitel(true);
				break;

			case isNaN(Number(searchTerm)): {
				const resultTitel = await fetchTitel(searchTerm);
				setShowTableId(false);

				if (resultTitel?.buecher) {
					setError('');
					setDatenTitel(resultTitel);
					setShowTableTitel(true);
				} else {
					setError('Mach kein Scheiße, gib was Gescheites an');
					setDatenTitel(null);
				}
				break;
			}

			case !isNaN(Number(searchTerm)):{
				const resultId = await fetchId(searchTerm);
				setShowTableTitel(false);

				if (resultId?.buch) {
					setError('');
					setDatenId(resultId);
					setShowTableId(true);
				} else {
					setError('Mach kein Scheiße, gib was Gescheites an');
					setDatenId(null);
				}
				break;
			}

			default:
				setError('Mach kein Scheiße, gib was Gescheites an');
			}	
		
		} catch (error) {
			console.error('Fehler beim Laden der Daten:', error);
			setError('Fehler beim Laden der Daten');
			setDatenId(null);
			setDatenTitel(null);
			throw new Error();
		}
	};
	// try und catch
	const handleRowClick = (buch: Buch) => {
		setSelectedBook(buch);
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setSelectedBook(null);
		setShowModal(false);
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
					<ErrorAusgabe error={error} setError={setError} />
					<div className="table-container">
						{showTableTitel && datenTitel && (
							<ShowTableTitel
								datenTitel={datenTitel}
								handleRowClick={handleRowClick}
							/>
						)}
						{showTableId && datenId && (
							<ShowTableId
								datenId={datenId}
								handleRowClick={handleRowClick}
							/>
						)}
					</div>
					{selectedBook && (
						<ModalUbertragung
							selectedBook={selectedBook}
							showModal={showModal}
							handleCloseModal={handleCloseModal}
						/>
					)}
				</Col>
			</Row>
		</Container>
	);
}