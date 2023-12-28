/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useState, useContext } from 'react';
import { Form } from 'react-bootstrap';
import './NeuesBuch.css';
import { mutation } from '../../Controller/buch-mutation';
import { AuthContext } from '../../Controller/AuthContext';
import { isTokenExpired } from './TokenValidierung';
import { Homepage } from './Homepage.component';
import { Schlagwoerter } from './Schlagwoerter.component';
import { Lieferbar } from './Lieferbar.component';
import { Rating } from './Rating.component';
import { Datum } from './Datum.component';
import { Rabatt } from './Rabatt.component';
import { Preis } from './Preis.component';
import { Isbn } from './Isbn.component';
import { Art } from './Art.component';
import { Titel } from './Titel.component';
import { UnterTitel } from './UnterTitel.component';
import { SubmitButton } from './SubmitButton.component';

// eslint-disable-next-line max-lines-per-function
export function NeuesBuch() {
	const [isbn, setIsbn] = useState<string>('');
	const [rabatt, setRabatt] = useState<number>(0);
	const [rating, setRating] = useState<number>(0);
	const [art, setArt] = useState<string>('DRUCKAUSGABE');
	const [preis, setPreis] = useState<number>(0);
	const [lieferbar, setLieferbar] = useState<boolean>(false);
	const [datum, setDatum] = useState<string>('');
	const [schlagwoerter, setSchlagwoerter] = useState<string[]>([]);
	const [homepage, setHomepage] = useState<string>('');

	const [titel, setTitel] = useState<string>('');
	const [unterTitel, setUnterTitel] = useState<string>('');

	const [showID, setShowID] = useState(false);
	const [id, setID] = useState<number | undefined>(undefined);

	const { token } = useContext(AuthContext);
	const { expiresIn } = useContext(AuthContext);
	const { tokenIssuedAt } = useContext(AuthContext);

	const handleCreateClick = () => {
		console.log(isbn);
		const isExpired = isTokenExpired(expiresIn, tokenIssuedAt);
		if (isExpired) {
			console.log('Das Token ist abgelaufen.');
		} else {
			console.log(rabatt);
			if (isbn !== '' && titel !== '' && preis > 0) {
				const ergebnis = async () =>
					await mutation(
						{
							isbn: isbn,
							rating: rating,
							art: art,
							preis: preis,
							rabatt: rabatt,
							lieferbar: lieferbar,
							datum: datum,
							homepage: homepage,
							schlagwoerter: schlagwoerter,
							titel: {
								titel: titel,
								untertitel: unterTitel,
							},
							abbildungen: [
								{
									beschriftung: 'Abb. 1',
									contentType: 'img/png',
								},
							],
						},
						token,
					);
				console.log(ergebnis);
				//TODO Promise irgendwie abfragen.
				setID(2);
				console.log(id);
				if (id !== null) {
					setShowID(true);
				}
			} else {
				console.log('Unvollständige oder Falsche Eingabe');
			}
		}
	};

	return (
		<div>
			<h1>Neuanlegen eines Buches</h1>
			<h2 className="UeberschriftNeuanlegen">Neuanlegen eines Buches</h2>
			<div>
				<Form>
					<Form.Group
						controlId="buch-anlegen"
						className="buch-anlegen-form"
					>
						<Isbn setIsbn={setIsbn} />
						<Titel setTitel={setTitel} />
						<UnterTitel setUnterTitel={setUnterTitel} />
						<Preis setPreis={setPreis} />
						<Rabatt setRabatt={setRabatt} />
						<Rating setRating={setRating} />
						<Art setArt={setArt} />
						<Lieferbar setLieferbar={setLieferbar} />
						<Datum setDatum={setDatum} />
						<Homepage setHomepage={setHomepage} />
						<Schlagwoerter
							schlagwoerter={schlagwoerter}
							setSchlagwoerter={setSchlagwoerter}
						/>
					</Form.Group>
					<SubmitButton handleCreateClick={handleCreateClick} />
				</Form>
				{showID && id && (
					<div>
						<p>Das Buch wurde angelegt</p>
					</div>
				)}
			</div>
		</div>
	);
}
