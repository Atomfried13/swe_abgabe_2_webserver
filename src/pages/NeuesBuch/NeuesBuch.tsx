/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import './NeuesBuch.css';
import { mutation } from '../../Controller/buch-mutation';
import { AuthContext } from '../../Controller/AuthContext';
import { isTokenExpired } from './TokenValidierung';
import { Einloggen } from '../../Controller/auth.service';
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
	const [isbn, setIsbn] = useState<string>('978-0-321-19368-1');
	const [titel, setTitel] = useState<string>('');
	const [rabatt, setRabatt] = useState<number>(0.0);
	const [rating, setRating] = useState<number>(0);
	const [art, setArt] = useState<string>('DRUCKAUSGABE');
	const [preis, setPreis] = useState<number>(100.0);
	const [lieferbar, setLieferbar] = useState<boolean>(false);
	//TODO Datum stimmt noch was mit dem übertragen der Daten vom Formular nicht.
	const [datum, setDatum] = useState<string>('2022-01-31');
	const [schlagwoerter, setSchlagwoerter] = useState<string[]>([]);
	const [homepage, setHomepage] = useState<string>('');

	const [showTable, setShowTable] = useState(false);
	const [id, setID] = useState(null);
	const { username } = useContext(AuthContext);
	const { password } = useContext(AuthContext);
	const { token } = useContext(AuthContext);
	const { expiresIn } = useContext(AuthContext);
	const { tokenIssuedAt } = useContext(AuthContext);
	const { setToken } = useContext(AuthContext);
	const { setExpiresIn } = useContext(AuthContext);
	const { setTokenIssuedAt } = useContext(AuthContext);

	const handleCreateClick = async () => {
		console.log(isbn);
		console.log(titel);
		console.log(preis);
		console.log(rabatt);
		console.log(username);
		const isExpired = isTokenExpired(expiresIn, tokenIssuedAt);
		let validToken: string = token;
		if (isExpired) {
			console.log('Das Token ist abgelaufen.');
			try {
				const response = await Einloggen(username, password);
				console.log(response);
				const newToken = response.data.data?.login?.token;
				const newExpiresIn = response.data.data?.login?.expiresIn;
				setToken(newToken);
				setExpiresIn(newExpiresIn);
				setTokenIssuedAt(new Date());
				validToken = newToken;
			} catch (error) {
				console.error(error);
			}
		} else {
			console.log('Das Token ist noch gültig.');
		}
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
				validToken,
			),
		);
		console.log(id);
		if (id !== null) {
			setShowTable(true);
		}
	};

	return (
		<div>
			<div className="infos">
				<h2>Neuanlegen eines Buches</h2>
			</div>
			<Form>
				<Form.Group
					controlId="buch-anlegen"
					className="buch-anlegen-form"
				>
					<Isbn isbn={isbn} setIsbn={setIsbn} />
					<Titel titel={titel} setTitel={setTitel} />
					<Preis preis={preis} setPreis={setPreis} />
					<Rabatt rabatt={rabatt} setRabatt={setRabatt} />
					<Rating rating={rating} setRating={setRating} />
					<Art setArt={setArt} />
					<br />
					<Lieferbar setLieferbar={setLieferbar} />
					<br />
					<Datum datum={datum} setDatum={setDatum} />
					<Homepage homepage={homepage} setHomepage={setHomepage} />
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
			{showTable && id && (
				<div>
					<p>Das Buch wurde angelegt</p>
				</div>
			)}
		</div>
	);
}
