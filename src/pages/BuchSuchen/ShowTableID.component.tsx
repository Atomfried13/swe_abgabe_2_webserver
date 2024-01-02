import { useState } from 'react';
import { Table } from 'react-bootstrap';
import { QueryIdAusgabe } from './BuchSuchen';
import { Buch } from '../../Controller/buch-query';
import { ModalUbertragung } from './Modal.component';

interface ShowTableIdUebertragung {
	datenId: QueryIdAusgabe;
}

export function ShowTableId({ datenId }: ShowTableIdUebertragung) {
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
		<div style={{ overflowX: 'auto' }}>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>ID</th>
						<th>Titel</th>
						<th>Preis</th>
						<th>Art</th>
						<th>Bewertung</th>
						<th>Rabatt</th>
					</tr>
				</thead>
				<tbody>
					<tr
						key={datenId.buch.id}
						onClick={() => handleRowClick(datenId.buch)}
					>
						<td>{datenId.buch.id}</td>
						<td>{datenId.buch.titel?.titel}</td>
						<td>{datenId.buch.preis}</td>
						<td>{datenId.buch.art}</td>
						<td>{datenId.buch.rating}</td>
						<td>{datenId.buch.rabatt}</td>
					</tr>
				</tbody>
			</Table>
			{selectedBook && (
				<ModalUbertragung
					selectedBook={selectedBook}
					showModal={showModal}
					handleCloseModal={handleCloseModal}
				/>
			)}
		</div>
	);
}
