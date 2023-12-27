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
import { fetchTitel, fetchId } from '../../Controller/buch-query';

interface BuchData {
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

interface QueryIdAusgabe {
	data: {
		buch: BuchData;
	};
}
interface QueryTitelAusgabe {
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
									{datenTitel?.data.buecher.map(
										(buch, index) => (
											<tr
												key={index}
												onClick={() =>
													handleRowClick(buch)
												}
											>
												<td>{index + 1}</td>
												<td>{buch.id}</td>
												<td>{buch.titel?.titel}</td>
												<td>{buch.preis}</td>
												<td>{buch.art}</td>
												<td>{buch.rating}</td>
											</tr>
										),
									)}
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
										key={datenId.data.buch.id}
										onClick={() =>
											handleRowClick(datenId.data.buch)
										}
									>
										<td>{datenId.data.buch.id}</td>
										<td>
											{datenId.data.buch.titel?.titel}
										</td>
										<td>{datenId.data.buch.preis}</td>
										<td>{datenId.data.buch.art}</td>
										<td>{datenId.data.buch.rating}</td>
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
