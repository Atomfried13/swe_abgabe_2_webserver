import { Modal } from 'react-bootstrap';
import { Buch } from '../../Controller/buch-query';

interface ModalAnzeigeProps {
	selectedBook: Buch;
	showModal: boolean;
	handleCloseModal: () => void;
}

export function ModalAnzeige(props: ModalAnzeigeProps) {
	return (
		<>
			<Modal
				className="info-modal"
				show={props.showModal}
				onHide={props.handleCloseModal}
			>
				<Modal.Header closeButton>
					<Modal.Title>
						Weitere Informationen zum Buch{' '}
						{props.selectedBook.titel?.titel} mit der ID{' '}
						{props.selectedBook.id}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{props.selectedBook && (
						<div>
							<p>ISBN: {props.selectedBook.isbn}</p>
							<p>
								Schlagwörter:{' '}
								{props.selectedBook.schlagwoerter.join(', ')}
							</p>
							<p>
								Lieferbar:{' '}
								{String(props.selectedBook.lieferbar)}
							</p>
						</div>
					)}
				</Modal.Body>
			</Modal>
		</>
	);
}
