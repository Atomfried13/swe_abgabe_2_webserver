// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable prettier/prettier */
import { useState } from 'react'; // Warum ist da key!!!, habe es weggemacht.
import {
	Form,
	Button,
	Table,
	Alert,
	Modal,
	Row,
	Col,
	Container,
} from 'react-bootstrap';
import './BuchSuchen.css';
import {
	fetchTitel,
	fetchId,
	Buch,
	BuchListe,
} from '../../Controller/buch-query';
interface QueryIdAusgabe {
	buch: Buch;
}
interface QueryTitelAusgabe {
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
	const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

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
	const handleRadioClick = async (letter) => {
		setDatenTitel(await fetchTitel(letter));
		setError('');
		setShowTableId(false);
		setShowTableTitel(true);
		// Setze den Suchbegriff zurück, wenn ein Radio-Button ausgewählt wird
		setSearchTerm('');
		// Setze den ausgewählten Buchstaben
		setSelectedLetter(letter);
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
								<Form.Control
									type="suchkriterien"
									placeholder="Suche anhand der ID oder des Titels..."
									value={searchTerm}
									onChange={(event) =>
										setSearchTerm(event.target.value)
									}
								/>
								<Button
									className="suchen-btn"
									onClick={handleSearchClick}
								>
									Suchen
								</Button>
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
					{error && (
						<Alert
							variant="danger"
							onClose={() => setError('')}
							dismissible
						>
							<Alert.Heading>Fehler!</Alert.Heading>
							<p>{error}</p>
						</Alert>
					)}
					<div className="table-container">
						{showTableTitel && datenTitel && (
							<Table striped bordered hover>
								<thead>
									<tr>
										<th>Nr.</th>
										<th>ID</th>
										<th>Titel</th>
										<th>Preis</th>
										<th>Art</th>
										<th>Bewertung</th>
									</tr>
								</thead>
								<tbody>
									{datenTitel?.buecher.map((buch, index) => (
										<tr
											key={index}
											onClick={() => handleRowClick(buch)}
										>
											<td>{index + 1}</td>
											<td>{buch.id}</td>
											<td>{buch.titel?.titel}</td>
											<td>{buch.preis}</td>
											<td>{buch.art}</td>
											<td>{buch.rating}</td>
										</tr>
									))}
								</tbody>
							</Table>
						)}
						{showTableId && datenId && (
							<Table striped bordered hover>
								<thead>
									<tr>
										<th>ID</th>
										<th>Titel</th>
										<th>Preis</th>
										<th>Art</th>
										<th>Bewertung</th>
									</tr>
								</thead>
								<tbody>
									<tr
										key={datenId.buch.id}
										onClick={() =>
											handleRowClick(datenId.buch)
										}
									>
										<td>{datenId.buch.id}</td>
										<td>{datenId.buch.titel?.titel}</td>
										<td>{datenId.buch.preis}</td>
										<td>{datenId.buch.art}</td>
										<td>{datenId.buch.rating}</td>
									</tr>
								</tbody>
							</Table>
						)}
					</div>
					{selectedBook && (
						<Modal
							className="info-modal"
							show={showModal}
							onHide={handleCloseModal}
						>
							<Modal.Header closeButton>
								<Modal.Title>
									Weitere Informationen zum Buch{' '}
									{selectedBook.titel?.titel} mit der ID{' '}
									{selectedBook.id}
								</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								{selectedBook && (
									<div>
										<p>ISBN: {selectedBook.isbn}</p>
										<p>
											Schlagwörter:{' '}
											{selectedBook.schlagwoerter.join(
												', ',
											)}
										</p>
										<p>
											Lieferbar:{' '}
											{String(selectedBook.lieferbar)}
										</p>
									</div>
								)}
							</Modal.Body>
						</Modal>
					)}
				</Col>
			</Row>
		</Container>
	);
}
