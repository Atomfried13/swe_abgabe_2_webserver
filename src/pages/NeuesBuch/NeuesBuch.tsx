/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable max-lines-per-function */
import { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import './NeuesBuch.css';
import { mutation } from '../../Controller/buch-mutation';
import { AuthContext } from '../../Controller/AuthContext';
import { Homepage } from './Homepage.component';
import { Schlagwoerter } from './Schlagwoerter.component';
import { Lieferbar } from './Lieferbar.component';
import { Rating } from './Rating.component';
import { Datum } from './Datum.component';
import { Rabatt } from './Rabatt.component';
import { Preis } from './Preis.component';

export function NeuesBuch() {
	const [isbn, setISBN] = useState('978-0-321-19368-1');
	const [titel, setTitel] = useState('Hallo');
	const [rabatt, setRabatt] = useState<number | undefined>(undefined);
	const [rating, setRating] = useState<number | undefined>(undefined);
	const [art, setArt] = useState('DRUCKAUSGABE');
	const [preis, setPreis] = useState<number>(0.0);
	const [lieferbar, setLieferbar] = useState(false);
	const [datum, setDatum] = useState('');
	const [schlagwoerter, setSchlagwoerter] = useState<string[]>([]);
	const [homepage, setHomepage] = useState('');
	const [showTable, setShowTable] = useState(false);

	const [id, setID] = useState(null);

	const { token } = useContext(AuthContext);

	const handleCreateClick = async () => {
		console.log(preis);
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
					<Form.Label>ISBN</Form.Label>
					<Form.Control
						required
						type="text"
						placeholder="z.B. 0-0070-0644-6"
						value={isbn}
						onChange={(event) => setISBN(event.target.value)}
					/>
					<Form.Label>Titel</Form.Label>
					<Form.Control
						required
						type="text"
						placeholder="z.B. Learning React"
						value={titel}
						onChange={(event) => setTitel(event.target.value)}
					/>
					<Preis preis={preis} setPreis={setPreis} />
					<Rabatt rabatt={rabatt} setRabatt={setRabatt} />
					<Rating rating={rating} setRating={setRating} />
					<input
						type="radio"
						id="DRUCKAUSGABE"
						name="Art"
						value="DRUCKAUSGABE"
						defaultChecked
						onChange={(event) => setArt(event.target.value)}
					/>
					<label id="DRUCKAUSGABE">DRUCKAUSGABE</label>
					<br />
					<input
						type="radio"
						id="KINDLE"
						name="Art"
						value="KINDLE"
						onChange={(event) => setArt(event.target.value)}
					/>
					<label id="KINDLE">KINDLE</label>
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
