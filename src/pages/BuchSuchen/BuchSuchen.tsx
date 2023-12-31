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
			setError('');
			setShowTableId(false);
			setShowTableTitel(false);
			switch (true) {
			case searchTerm === '':{ // '' unsicher
				const {data} = await fetchTitel(searchTerm);				
				setDatenTitel(data.data);
				setShowTableTitel(true);
				break;
			}

			case isNaN(Number(searchTerm)): {
				const {data} = await fetchTitel(searchTerm);

				if (data.errorMessage == '') {
					setDatenTitel(data.data);
					setShowTableTitel(true);
				} else {
					setError(data.errorMessage);
					setDatenTitel(null); //Ü
				}
				break;
			}

			case !isNaN(Number(searchTerm)):{
				const {data} = await fetchId(searchTerm);

				if (data.errorMessage == '') {
					setDatenId(data.data);
					setShowTableId(true);
				} else {
					setError(data.errorMessage);
					setDatenId(null);//Ü
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
			setDatenId(null);
			setDatenTitel(null);
			throw new Error();
		}
	};

	const handleCheckboxChange = async(id:string) => {
		try {
			switch (true) {
			case id === '1':{
				setShowTableBoxId1(!showTableBoxId1);
				const {data} = await fetchId(id);
				setDatenBoxId1(data.data);
				setError('');
				break;
			}

			case id === '20':{
				setShowTableBoxId20(!showTableBoxId20);
				const {data} = await fetchId(id);
				setDatenBoxId20(data.data);
				setError('');
				break;
			}

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
			const {data}=(await fetchTitel(letter));
			setDatenTitel(data.data);
			setError('');
			setShowTableId(false);
			setShowTableTitel(true);
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