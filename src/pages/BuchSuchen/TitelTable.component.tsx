import { Table } from 'react-bootstrap';
import { QueryTitelDaten } from './BuchSuchen';
import { Buch } from '../../Controller/buch-query';
import { useState } from 'react';
import { ModalAnzeige } from './ModalAnzeige.component';

interface TitelTableProps {
	datenTitel: QueryTitelDaten;
}

export function TitelTable({ datenTitel }: TitelTableProps) {
	const [selectedBook, setSelectedBook] = useState<Buch | null>(null);
	const [showModal, setShowModal] = useState<boolean>(false);

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
				<ModalAnzeige
					selectedBook={selectedBook}
					showModal={showModal}
					handleCloseModal={handleCloseModal}
				/>
			)}
		</div>
	);
}
