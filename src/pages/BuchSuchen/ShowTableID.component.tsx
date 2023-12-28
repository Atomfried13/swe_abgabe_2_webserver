import { Table } from 'react-bootstrap';
import { QueryIdAusgabe } from './BuchSuchen';
import { Buch } from '../../Controller/buch-query';

interface ShowTableIdUebertragung {
	datenId: QueryIdAusgabe;
	handleRowClick: (buch: Buch) => void;
}

export function ShowTableId(showTableIdUebertragung: ShowTableIdUebertragung) {
	return (
		<>
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
						key={showTableIdUebertragung.datenId.data.buch.id}
						onClick={() =>
							showTableIdUebertragung.handleRowClick(
								showTableIdUebertragung.datenId.data.buch,
							)
						}
					>
						<td>{showTableIdUebertragung.datenId.data.buch.id}</td>
						<td>
							{
								showTableIdUebertragung.datenId.data.buch.titel
									?.titel
							}
						</td>
						<td>
							{showTableIdUebertragung.datenId.data.buch.preis}
						</td>
						<td>{showTableIdUebertragung.datenId.data.buch.art}</td>
						<td>
							{showTableIdUebertragung.datenId.data.buch.rating}
						</td>
					</tr>
				</tbody>
			</Table>
		</>
	);
}
