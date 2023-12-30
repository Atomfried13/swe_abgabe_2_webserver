/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useState, useContext } from 'react';
import { Alert } from 'react-bootstrap';
import './NeuesBuch.css';
import { mutation } from '../../Controller/buch-mutation';
import { AuthContext } from '../../Controller/AuthContext';
import { isTokenExpired } from './TokenValidierung';
import { Formular } from './Formular.component';
import { BuchDTO } from '../../Model/buchDTO.entitie';

export function NeuesBuch() {
	const [showID, setShowID] = useState(false);
	const [id, setID] = useState<number | undefined>(undefined);

	const { token } = useContext(AuthContext);
	const { expiresIn } = useContext(AuthContext);
	const { tokenIssuedAt } = useContext(AuthContext);
	const [showTokenExpiredMsg, setShowTokenExpiredMsg] = useState(false);

	const handleCreate = async (buch: BuchDTO) => {
		if (token != undefined) {
			let isExpired;
			if (tokenIssuedAt != undefined) {
				isExpired = isTokenExpired(expiresIn, tokenIssuedAt);
			}
			if (isExpired) {
				console.log('Das Token ist abgelaufen.');
				setShowTokenExpiredMsg(true);
			} else {
				console.log('Das Token ist noch gültig.');
				try {
					if (buch === undefined) {
						throw new Error('Kein Buch vorhanden!');
					}
					console.log(buch);
					const result = await mutation(buch, token);
					console.log(result);
					setID(2);
					console.log(id);
					if (id !== null) {
						setShowID(true);
					}
				} catch (error) {
					console.error('Fehler:', error);
				}
			}
		}
	};

	return (
		<>
			<h2 className="UeberschriftNeuanlegen">Neuanlegen eines Buches</h2>
			<div>
				<Formular handleCreate={handleCreate} />
				{showID && id && (
					<div>
						<p>Das Buch wurde angelegt</p>
					</div>
				)}
				<Alert show={showTokenExpiredMsg} variant="danger">
					<Alert.Heading>Token abgelaufen</Alert.Heading>
					<p>Token ist nicht mehr gültig. Bitte erneut einloggen.</p>
				</Alert>
			</div>
		</>
	);
}
