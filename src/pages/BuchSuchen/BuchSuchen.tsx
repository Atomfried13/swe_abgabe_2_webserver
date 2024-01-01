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
import { SearchRadioButtons} from './RadioButtons';
import { SearchCheckboxId1, SearchCheckboxId20 } from './Checkboxen';

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
	const [datenBoxId20, setDatenBoxId20] = useState<QueryIdAusgabe | null>(
		null,
	);
	const [datenBoxId1, setDatenBoxId1] = useState<QueryIdAusgabe | null>(null);
	const [searchTerm, setSearchTerm] = useState('');
	const [error, setError] = useState('');
	const [selectedBook, setSelectedBook] = useState<Buch | null>(null);
	const [showModal, setShowModal] = useState(false);
	const [selectedLetter, setSelectedLetter] = useState<string | null>(null); //aktiv zeichen im Radiobutton
	const [showTableBoxId1, setShowTableBoxId1] = useState(false);
	const [showTableBoxId20, setShowTableBoxId20] = useState(false);
	
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
			setSelectedLetter(null);
		} catch (error) {
			console.error('Fehler beim Laden der Daten:', error);
			setError('Fehler beim Laden der Daten');
			throw new Error();
		}
	};
	// auslagern????????????
	const handleCheckboxChange = async (id: string) => {
		try {
			switch (true) {
			case id === '1': {
				setShowTableBoxId1(!showTableBoxId1);
				setDatenBoxId1((await fetchId(id)).data.data);
				setError('');
				break;
			}

			case id === '20': {
				setShowTableBoxId20(!showTableBoxId20);
				setDatenBoxId20((await fetchId(id)).data.data);
				setError('');
				break;
			}
			}
		} catch (error) {
			console.error('Fehler beim Laden der Daten:', error);
			setError('Fehler beim Laden der Daten');
			//setDatenBoxId1(null);
			//setDatenBoxId20(null);
			//setShowTableBoxId1(false);
			//setShowTableBoxId20(false);
			throw new Error();
		}
	};

	const handleRadioClick = async (letter: string) => {
		try {
			setDatenId(null);
			setDatenTitel((await fetchTitel(letter)).data.data);
			setError('');
			setSelectedLetter(letter);
		} catch (error) {
			console.error('Fehler beim Laden der Daten:', error);
			setError('Fehler beim Laden der Daten');
			//setDatenTitel(null);
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
					<Form.Group>
						<SearchRadioButtons selectedLetter={selectedLetter} handleRadioClick={handleRadioClick} />
					</Form.Group>
					<Form.Group>
						<SearchCheckboxId1
							handleCheckboxChange={handleCheckboxChange}
							checked={showTableBoxId1}
						/>
						<SearchCheckboxId20
							handleCheckboxChange={handleCheckboxChange}
							checked={showTableBoxId20}
						/>
					</Form.Group>
					<ErrorAusgabe error={error} setError={setError} />
					<div className="table-container">
						{datenTitel && (
							<ShowTableTitel
								datenTitel={datenTitel}
								handleRowClick={handleRowClick}
							/>
						)}
						{datenId && (
							<ShowTableId
								datenId={datenId}
								
							/>
						)}
						{showTableBoxId1 && datenBoxId1 && (
							<ShowTableId
								datenId={datenBoxId1}
								handleRowClick={handleRowClick}
							/>
						)}
						{showTableBoxId20 && datenBoxId20 && (
							<ShowTableId
								datenId={datenBoxId20}
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
