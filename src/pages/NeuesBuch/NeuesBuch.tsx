/* eslint-disable eslint-comments/disable-enable-pair */
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
import { BuchArt } from '../../Model/buchDTO.entitie';
import { AuthContext } from '../../Controller/AuthContext';

export function NeuesBuch() {
	const [isbn, setISBN] = useState('978-0-321-19368-1');
	const [titel, setTitel] = useState('Hallo');
	const [rabatt, setRabatt] = useState(0.05);
	const [rating, setRating] = useState(2);
	const [art, setArt] = useState('DRUCKAUSGABE');
	const [preis, setPreis] = useState(90.0);
	const [lieferbar, setLieferbar] = useState(false);
	const [datum, setDatum] = useState('2022-01-31');
	const [homepage, setHomepage] = useState('https://create.mutation');
	const [schlagwoerter, setSchlagwoerter] = useState<string[] | undefined>(
		undefined,
	);
	const [selectedSchlagwoerter, setSelectedSchlagwoerter] = useState<
		string[]
	>([]);
	const [id, setID] = useState(null);

	const handleSchlagwoerterChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const { value, checked } = event.target;
		let updatedSchlagwoerter = [...selectedSchlagwoerter];

		if (checked) {
			updatedSchlagwoerter = [...updatedSchlagwoerter, value];
		} else {
			updatedSchlagwoerter = updatedSchlagwoerter.filter(
				(item) => item !== value,
			);
		}

		setSelectedSchlagwoerter(updatedSchlagwoerter);
		setSchlagwoerter(selectedSchlagwoerter);
	};

	const { token } = useContext(AuthContext);
	const { expiresIn } = useContext(AuthContext);
	const { tokenIssuedAt } = useContext(AuthContext);

	const handleCreateClick = async () => {
		console.log(isbn);
		console.log(titel);
		console.log(preis);
		console.log(rabatt);

		function isTokenExpired(
			expirationString: string | undefined,
			issuedTime: Date,
		): boolean {
			if (!expirationString) {
				return true;
			}
			let expiresIn;
			const value = parseInt(expirationString);
			if (expirationString.includes('h')) {
				expiresIn = value * 60 * 60 * 1000;
			} else if (expirationString.includes('m')) {
				expiresIn = value * 60 * 1000;
			} else if (expirationString.includes('s')) {
				expiresIn = value * 1000;
			}

			const expirationTime = issuedTime.getTime() + expiresIn;
			const now = new Date().getTime();
			return expirationTime < now;
		}

		const isExpired = isTokenExpired(expiresIn, tokenIssuedAt);

		if (isExpired) {
			console.log('Das Token ist abgelaufen.');
		} else {
			console.log('Das Token ist noch gültig.');
		}
		setID(
			await mutation(
				{
					isbn: isbn,
					rating: 1,
					art: art,
					preis: 99.99,
					rabatt: 0.123,
					lieferbar: true,
					datum: '2022-01-31',
					homepage: 'https://create.mutation',
					schlagwoerter: ['JAVASCRIPT', 'TYPESCRIPT'],
					titel: {
						titel: 'Titelcreatemutation',
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
					<Form.Label>Homepage</Form.Label>
					<Form.Control
						type="text"
						placeholder="z.B. https://h-ka.de"
						value={homepage}
						onChange={(event) => setHomepage(event.target.value)}
					/>
					<Form.Label>Schlagwoerter</Form.Label>
					<br />
					<input
						type="checkbox"
						id="Typescript"
						name="Typescript"
						value="Typescript"
						onChange={handleSchlagwoerterChange}
					/>
					<label htmlFor="Typescript">Typescript</label>
					<br />
					<input
						type="checkbox"
						id="Javascript"
						name="Javascript"
						value="Javascript"
						onChange={handleSchlagwoerterChange}
					/>
					<label htmlFor="Javascript">Javascript</label>
					<br />
				</Form.Group>
				<Button
					onClick={handleCreateClick}
					type="submit"
					className="buch-schreiben-form"
				>
					Neues Buch anlegen
				</Button>
			</Form>
		</div>
	);
}
