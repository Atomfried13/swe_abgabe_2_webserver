/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-duplicate-disable */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable max-lines-per-function */
import { useState } from 'react'; // Warum ist da key!!!, habe es weggemacht.
import { Form, Button, Table, Alert } from 'react-bootstrap';
import './BuchSuchen.css';
import { fetchTitel, fetchId } from '../../Controller/buch-query';

interface BuchData {
	id: string;
	isbn: string;
	version: number;
	preis: number;
	rating: number;
	art: string;
	rabatt: string;
	titel: {
		titel: string;
	};
}

interface QueryResultId {
	data: {
		buch: BuchData;
	};
}
interface QueryResultTitel {
	data: {
		buecher: BuchData[];
	};
}

export function BuchSuchen() {
	const [datenTitel, setDatenTitel] = useState<QueryResultTitel | null>(null);
	const [datenId, setDatenId] = useState<QueryResultId | null>(null);
	const [searchTerm, setSearchTerm] = useState('');
	const [showTableTitel, setShowTableTitel] = useState(false);
	const [showTableId, setShowTableId] = useState(false);
	const [error, setError] = useState('');

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

				if (result.data.buecher !== null) {
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
					result.data.buch !== null &&
					result.data !== null &&
					result.data !== undefined
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
	return (
		<>
			<div className="d-flex align-items-center">
				<Form>
					<Form.Group
						className="buch-suchen-form"
						controlId="formGroupSuchen"
					>
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
						</Form.Group>
					</Form.Group>
				</Form>
				<Button onClick={handleSearchClick} className="suchen-btn">
					Suchen
				</Button>
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
			{showTableTitel && datenTitel && (
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>Nr.</th>
							<th>Titel</th>
							<th>Preis</th>
							<th>Art</th>
							<th>Bewertung</th>
						</tr>
					</thead>
					<tbody>
						{datenTitel?.data.buecher.map((buch, index) => (
							<tr key={index}>
								<td>{index + 1}</td>
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
						<tr key={datenId.data.buch.id}>
							<td>{datenId.data.buch.id}</td>
							<td>{datenId.data.buch.titel?.titel}</td>
							<td>{datenId.data.buch.preis}</td>
							<td>{datenId.data.buch.art}</td>
							<td>{datenId.data.buch.rating}</td>
						</tr>
					</tbody>
				</Table>
			)}
		</>
	);
}
