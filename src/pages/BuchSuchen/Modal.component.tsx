import { Modal } from 'react-bootstrap';
import { Buch } from '../../Controller/buch-query';

interface ModalUebertragung {
	selectedBook: Buch;
	showModal: boolean;
	handleCloseModal: () => void;
}

export function ModalUbertragung(modalUebertragung: ModalUebertragung) {
	return (
		<>
			<Modal
				className="info-modal"
				show={modalUebertragung.showModal}
				onHide={modalUebertragung.handleCloseModal}
			>
				<Modal.Header closeButton>
					<Modal.Title>
						Weitere Informationen zum Buch{' '}
						{modalUebertragung.selectedBook.titel?.titel} mit der ID{' '}
						{modalUebertragung.selectedBook.id}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{modalUebertragung.selectedBook && (
						<div>
							<p>ISBN: {modalUebertragung.selectedBook.isbn}</p>
							<p>
								Schlagwörter:{' '}
								{modalUebertragung.selectedBook.schlagwoerter.join(
									', ',
								)}
							</p>
							<p>
								Lieferbar:{' '}
								{String(
									modalUebertragung.selectedBook.lieferbar,
								)}
							</p>
						</div>
					)}
				</Modal.Body>
			</Modal>
		</>
	);
}
