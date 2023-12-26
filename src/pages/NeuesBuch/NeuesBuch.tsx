/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable eslint-comments/no-duplicate-disable */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-lines-per-function */
import { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import './NeuesBuch.css';
import { mutation } from '../../Controller/buch-mutation';
import { AuthContext } from '../../Controller/AuthContext';
import { Homepage } from './Homepage.component';
import { Schlagwoerter } from './Schlagwoerter.component';

export function NeuesBuch() {
	const [isbn, setISBN] = useState('978-0-321-19368-1');
	const [titel, setTitel] = useState('Hallo');
	const [rabatt, setRabatt] = useState(0.05);
	const [rating, setRating] = useState(2);
	const [art, setArt] = useState('DRUCKAUSGABE');
	const [preis, setPreis] = useState(90.0);
	const [lieferbar, setLieferbar] = useState(false);
	const [datum, setDatum] = useState('2022-01-31');
	const [schlagwoerter, setSchlagwoerter] = useState<string[]>([]);
	const [homepage, setHomepage] = useState('');
	const [showTable, setShowTable] = useState(false);

	const [id, setID] = useState(null);

	const { token } = useContext(AuthContext);

	const handleCreateClick = async () => {
		console.log(schlagwoerter);
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
					<Form.Label>Preis</Form.Label>
					<Form.Control
						required
						type=""
						placeholder="z.B. 30"
						value={preis}
						onChange={(event) =>
							setPreis(Number(event.target.value))
						}
					/>
					<Form.Label>Rabatt (in Prozent)</Form.Label>
					<Form.Control
						required
						type="text"
						placeholder="z.B. 10"
						value={rabatt}
						onChange={(event) =>
							setRabatt(Number(event.target.value))
						}
					/>
					<Form.Label>Rating (1 - 5 Sterne)</Form.Label>
					<Form.Control
						type=""
						placeholder="z.B. 2"
						value={rating}
						onChange={(event) =>
							setRating(Number(event.target.value))
						}
					/>
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
					<input
						type="checkbox"
						id="Lieferbar"
						name="Lieferbar"
						value="Lieferbar"
						onChange={(event) => setLieferbar(event.target.checked)}
					/>
					<label htmlFor="Lieferbar">Lieferbar</label>
					<br />
					<Form.Label>Datum</Form.Label>
					<Form.Control
						type="text"
						placeholder="2021-01-31"
						value={datum}
						onChange={(event) => setDatum(event.target.value)}
					/>
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
