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
import { Form, Button, Table } from 'react-bootstrap';
import './BuchSuchen.css';
import { fetchTitel, fetchId } from '../../Controller/buch-query';

export function BuchSuchen() {
	const [data, setData] = useState(null);
	const [searchTerm, setSearchTerm] = useState('');
	const [showTableTitel, setShowTableTitel] = useState(false);
	const [showTableId, setShowTableId] = useState(false);
	const [error, setError] = useState('');

	const handleSearchClick = async () => {
		try {
			if (!searchTerm) {
				setData(await fetchTitel(searchTerm));
				setError('');
				setShowTableId(false);
				setShowTableTitel(true);
			} else if (isNaN(Number(searchTerm))) {
				const result = await fetchTitel(searchTerm);
				setShowTableId(false);

				if (result.data.buecher !== null) {
					setError('');
					setData(result);
					setShowTableTitel(true);
				} else {
					setError('Mach kein Scheiße, gib was Gescheites an');
					setData(null);
				}
			} else {
				const result = await fetchId(searchTerm);
				setShowTableTitel(false);

				if (result.data.buch !== null) {
					setError('');
					setData(result);
					setShowTableId(true);
				} else {
					setError('Mach kein Scheiße, gib was Gescheites an');
					setData(null);
				}
			}
		} catch (error) {
			console.error('Fehler beim Laden der Daten:', error);
			setError('Fehler beim Laden der Daten');
			setData(null);
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
			{showTableTitel && data && (
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
						{data?.data.buecher.map((buch, index) => (
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
			{error && <div className="error-message">{error}</div>}
			{showTableId && data && (
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
						<tr key={data.data.buch.id}>
							<td>{data.data.buch.id}</td>
							<td>{data.data.buch.titel?.titel}</td>
							<td>{data.data.buch.preis}</td>
							<td>{data.data.buch.art}</td>
							<td>{data.data.buch.rating}</td>
						</tr>
					</tbody>
				</Table>
			)}
		</>
	);
}
