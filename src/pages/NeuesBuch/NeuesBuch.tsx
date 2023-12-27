/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
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

// eslint-disable-next-line max-lines-per-function
export function NeuesBuch() {
	//TODO Werte die undefined sind auch offen lassen, andere Werte abprüfen ob gesetz wurden und leere Startwerte setzen.
	//TODO Isbn stimmt noch was mit dem übertragen der Daten vom Formular nicht.
	const [isbn, setIsbn] = useState<string>('');
	const [titel, setTitel] = useState<string>('');
	const [rabatt, setRabatt] = useState<number>(0.0);
	const [rating, setRating] = useState<number>(0);
	const [art, setArt] = useState<string>('DRUCKAUSGABE');
	const [preis, setPreis] = useState<number>(100.0);
	const [lieferbar, setLieferbar] = useState<boolean>(false);
	//TODO Datum stimmt noch was mit dem übertragen der Daten vom Formular nicht.
	const [datum, setDatum] = useState<string>('');
	const [schlagwoerter, setSchlagwoerter] = useState<string[]>([]);
	const [homepage, setHomepage] = useState<string>('');

	const [showID, setShowID] = useState(false);
	const [id, setID] = useState(null);
	const { token } = useContext(AuthContext);
	const { expiresIn } = useContext(AuthContext);
	const { tokenIssuedAt } = useContext(AuthContext);

	const handleCreateClick = async () => {
		console.log(isbn);
		const isExpired = isTokenExpired(expiresIn, tokenIssuedAt);
		if (isExpired) {
			console.log('Das Token ist abgelaufen.');
		} else {
			setID(
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
							untertitel: 'untertitelcreatemutation',
						},
						abbildungen: [
							{
								beschriftung: 'Abb. 1',
								contentType: 'img/png',
							},
						],
					},
					token,
				),
			);
			console.log(id);
			if (id !== null) {
				setShowID(true);
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
					<Button
						onClick={handleCreateClick}
						type="submit"
						className="buch-schreiben-form"
					>
						Neues Buch anlegen
					</Button>
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
