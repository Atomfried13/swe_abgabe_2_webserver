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
	const [datenBoxId20, setDatenBoxId20] = useState<QueryIdAusgabe | null>(null);
	const [datenBoxId1, setDatenBoxId1] = useState<QueryIdAusgabe | null>(null);
	const [searchTerm, setSearchTerm] = useState('');
	const [showTableTitel, setShowTableTitel] = useState(false);
	const [showTableId, setShowTableId] = useState(false);
	const [error, setError] = useState('');
	const [selectedBook, setSelectedBook] = useState<Buch | null>(null);
	const [showModal, setShowModal] = useState(false);
	const [selectedLetter, setSelectedLetter] = useState<string | null>(null); //aktiv zeichen im Radiobutton
	const [showTableBoxId1, setShowTableBoxId1] = useState(false);
	const [showTableBoxId20, setShowTableBoxId20] = useState(false);
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
			setSelectedLetter(null);
		
		} catch (error) {
			console.error('Fehler beim Laden der Daten:', error);
			setError('Fehler beim Laden der Daten');
			setDatenId(null);
			setDatenTitel(null);
			throw new Error();
		}
	};

	const handleCheckboxChange = async(id:string) => {
		try {
			switch (true) {
			case id === '1':
				setShowTableBoxId1(!showTableBoxId1);
				setDatenBoxId1(await fetchId(id));
				setError('');
				break;

			case id === '20':
				setShowTableBoxId20(!showTableBoxId20);
				setDatenBoxId20(await fetchId(id));
				setError('');
				break;

			}
		} catch (error) {
			console.error('Fehler beim Laden der Daten:', error);
			setError('Fehler beim Laden der Daten');
			setDatenBoxId1(null);
			setDatenBoxId20(null);
			setShowTableBoxId1(false);
			setShowTableBoxId20(false);
			throw new Error();
		}
	};

	const handleRadioClick = async (letter: string) => {
		try {
			setDatenTitel(await fetchTitel(letter));
			setError('');
			setShowTableId(false);
			setShowTableTitel(true);
			setSearchTerm('');
			setSelectedLetter(letter);
		} catch (error) {
			console.error('Fehler beim Laden der Daten:', error);
			setError('Fehler beim Laden der Daten');
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
					<Form.Group>
						<Form.Check
							inline
							type="radio"
							label="A"
							name="searchLetter"
							id="searchLetterA"
							onChange={() => handleRadioClick('A')}
							checked={selectedLetter === 'A'}
						/>
						<Form.Check
							inline
							type="radio"
							label="L"
							name="searchLetter"
							id="searchLetterL"
							onChange={() => handleRadioClick('L')}
							checked={selectedLetter === 'L'}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Check
							inline
							type="checkbox"
							label="ID 1"
							id="checkboxId1"
							onChange={() => handleCheckboxChange('1')}
							checked={showTableBoxId1}
						/>
						<Form.Check
							inline
							type="checkbox"
							label="ID 20"
							id="checkboxId20"
							onChange={() => handleCheckboxChange('20')}
							checked={showTableBoxId20}
						/>
					</Form.Group>
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