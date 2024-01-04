import { useState } from 'react';
import { Table } from 'react-bootstrap';
import { QueryIdDaten, Buch } from '../../../Model/buch.entity';
import { ModalAnzeige } from './ModalAnzeige.component';

interface IdTableProps {
	datenId: QueryIdDaten;
}

export function IdTable({ datenId }: IdTableProps) {
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
				<ModalAnzeige
					selectedBook={selectedBook}
					showModal={showModal}
					handleCloseModal={handleCloseModal}
				/>
			)}
		</div>
	);
}
