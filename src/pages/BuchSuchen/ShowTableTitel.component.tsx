import { Table } from 'react-bootstrap';
import { QueryTitelAusgabe } from './BuchSuchen';
import { Buch } from '../../Controller/buch-query';

interface ShowTableTitelUebertragung {
	datenTitel: QueryTitelAusgabe;
	handleRowClick: (buch: Buch) => void;
}

export function ShowTableTitel(
	showTableTitelUebertragung: ShowTableTitelUebertragung,
) {
	return (
		<>
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
					{showTableTitelUebertragung.datenTitel?.buecher.map(
						(buch, index) => (
							<tr
								key={index}
								onClick={() =>
									showTableTitelUebertragung.handleRowClick(
										buch,
									)
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
		</>
	);
}
