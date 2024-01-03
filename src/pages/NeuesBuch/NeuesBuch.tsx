import { useState, useContext } from 'react';
import './NeuesBuch.css';
import { mutation } from '../../Controller/buch-mutation';
import { AuthContext } from '../../Controller/AuthContext';
import { isTokenExpired } from '../../Controller/TokenValidierung';
import { Formular } from './Formular.component';
import { BuchDTO } from '../../Model/buchDTO.entitie';
import { Alert } from 'react-bootstrap';

export function NeuesBuch() {
	const [id, setID] = useState<number | undefined>(undefined);
	const { token } = useContext(AuthContext);
	const { expiresIn } = useContext(AuthContext);
	const { tokenIssuedAt } = useContext(AuthContext);
	const [errorMessage, setErrorMessage] = useState<string | undefined>(
		undefined,
	);

	const handleCreate = (buch: BuchDTO) => {
		setErrorMessage(undefined);
		setID(undefined);
		void (async () => {
			if (token !== undefined) {
				let isExpired;
				if (tokenIssuedAt !== undefined) {
					isExpired = isTokenExpired(expiresIn, tokenIssuedAt);
				}
				if (isExpired) {
					setErrorMessage(
						'Token ist nicht mehr gültig. Bitte erneut einloggen.',
					);
					return;
				}
				try {
					if (buch === undefined) {
						setErrorMessage('Kein Buch vorhanden.');
						return;
					}

					const response = await mutation(buch, token);

					if (response.data.errors !== undefined) {
						setErrorMessage(response.data.errors[0].message);
						return;
					}
					setID(response.data.data.create.id);
				} catch (error) {
					setErrorMessage(
						'Ein unerwarteter Fehler ist aufgetreten, bitte versuche es später erneut.',
					);
				}
			}
		})();
	};

	return (
		<>
			<h2 className="TextAusgabeBuchAnlegen">Neuanlegen eines Buches</h2>
			<div>
				<Formular
					setErrorMessage={setErrorMessage}
					handleCreate={handleCreate}
				/>
				{id && (
					<p className="TextAusgabeBuchAnlegen">
						Das Buch wurde mit der ID {id} angelegt
					</p>
				)}
				<Alert show={errorMessage !== undefined} variant="danger">
					<p className="TextAusgabeBuchAnlegen">{errorMessage}</p>
				</Alert>
			</div>
		</>
	);
}
