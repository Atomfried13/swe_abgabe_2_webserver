import { useState } from 'react';
import { Form, Row, Col, Container } from 'react-bootstrap';
import './BuchSuchen.css';
import { fetchTitel, fetchId } from '../../Controller/buch-query';
import { SubmitButton } from './SubmitButtonQuery.component';
import { EingabeFeld } from './EingabeFeld.component';
import { ModalUbertragung } from './Modal.component';
import { ErrorAusgabe } from './ErrorAugabe.component';
import { ShowTableId } from './ShowTableID.component';
import { ShowTableTitel } from './ShowTableTitel.component';

export interface BuchData {
	id: string;
	isbn: string;
	art: string;
	preis: number;
	rating: number;
	rabatt: string;
	schlagwoerter: string[];
	lieferbar: boolean;
	titel: {
		titel: string;
	};
}

export interface QueryIdAusgabe {
	data: {
		buch: BuchData;
	};
}
export interface QueryTitelAusgabe {
	data: {
		buecher: BuchData[];
	};
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
	const [selectedBook, setSelectedBook] = useState<BuchData | null>(null);
	const [showModal, setShowModal] = useState(false);

	// eslint-disable-next-line max-statements
	const handleSearchClick = async () => {
		try {
			if (!searchTerm) {
				setDatenTitel(await fetchTitel(searchTerm));
				setError('');
				setShowTableId(false);
				setShowTableTitel(true);
			} else if (isNaN(Number(searchTerm))) {
				const result = await fetchTitel(searchTerm);
				setShowTableId(false);

				if (
					//TODO Optional-chain?
					// eslint-disable-next-line @typescript-eslint/prefer-optional-chain
					result &&
					result.data &&
					result.data.buecher &&
					result.data.buecher.id !== null
				) {
					setError('');
					setDatenTitel(result);
					setShowTableTitel(true);
				} else {
					setError('Mach kein Scheiße, gib was Gescheites an');
					setDatenTitel(null);
				}
			} else {
				const result = await fetchId(searchTerm);
				setShowTableTitel(false);

				if (
					//TODO Optional-chain?
					// eslint-disable-next-line @typescript-eslint/prefer-optional-chain
					result &&
					result.data &&
					result.data.buch &&
					result.data.buch.id !== null
				) {
					setError('');
					setDatenId(result);
					setShowTableId(true);
				} else {
					setError('Mach kein Scheiße, gib was Gescheites an');
					setDatenId(null);
				}
			}
		} catch (error) {
			console.error('Fehler beim Laden der Daten:', error);
			setError('Fehler beim Laden der Daten');
			setDatenId(null);
			setDatenTitel(null);
		}
	};

	const handleRowClick = (buch: BuchData) => {
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
