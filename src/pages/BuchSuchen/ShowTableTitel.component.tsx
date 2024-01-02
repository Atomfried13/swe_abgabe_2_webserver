import { Table } from 'react-bootstrap';
import { QueryTitelAusgabe } from './BuchSuchen';
import { Buch } from '../../Controller/buch-query';
import { useState } from 'react';
import { ModalUbertragung } from './Modal.component';

interface ShowTableTitelUebertragung {
	datenTitel: QueryTitelAusgabe;
}

export function ShowTableTitel({ datenTitel }: ShowTableTitelUebertragung) {
	const [selectedBook, setSelectedBook] = useState<Buch | null>(null);
	const [showModal, setShowModal] = useState(false);

	const handleRowClick = (buch: Buch) => {
		setSelectedBook(buch);
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setSelectedBook(null);
		setShowModal(false);
	};

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
						<th>Rabatt</th>
					</tr>
				</thead>
				<tbody>
					{datenTitel?.buecher.map((buch, index) => (
						<tr key={index} onClick={() => handleRowClick(buch)}>
							<td>{index + 1}</td>
							<td>{buch.id}</td>
							<td>{buch.titel?.titel}</td>
							<td>{buch.preis}</td>
							<td>{buch.art}</td>
							<td>{buch.rating}</td>
							<td>{buch.rabatt}</td>
						</tr>
					))}
				</tbody>
			</Table>
			{selectedBook && (
				<ModalUbertragung
					selectedBook={selectedBook}
					showModal={showModal}
					handleCloseModal={handleCloseModal}
				/>
			)}
		</>
	);
}
