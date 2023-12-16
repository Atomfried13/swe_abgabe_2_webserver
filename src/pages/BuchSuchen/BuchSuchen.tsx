/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-duplicate-disable */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable max-lines-per-function */
import { Key, useState } from 'react';
import { Form, Button, Table } from 'react-bootstrap';
import './BuchSuchen.css';
import { BuchDTO } from '../../Model/buchDTO.entitie';
import { fetchTitel } from '../../Controller/buch-query';

export function BuchSuchen() {
	const [data, set] = useState(null);
	const [titel, setTitel] = useState('');
	const [showTable, setShowTable] = useState(false);

	const handleSearchClickTitel = async () => {
		set(await fetchTitel(titel));
		setShowTable(true);
	};

	return (
		<>
			<div className="d-flex align-items-center">
				<Form>
					<Form.Group
						className="buch-suchen-form"
						controlId="formGroupSuchen"
					>
						<Form.Control
							type="suchkriterien"
							placeholder="Suche anhand des Titels..."
							value={titel}
							onChange={(event) => setTitel(event.target.value)}
						/>
					</Form.Group>
				</Form>
				<Button onClick={handleSearchClickTitel} className="suchen-btn">
					Suchen
				</Button>
			</div>
			{showTable && data && (
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
						{data?.data.buecher.map((buch: BuchDTO, index: Key) => (
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
		</>
	);
}
