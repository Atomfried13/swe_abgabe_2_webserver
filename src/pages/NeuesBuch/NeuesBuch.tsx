/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-lines-per-function */
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './NeuesBuch.css';
import { mutation } from '../../Controller/buch-mutation';
import { BuchArt } from '../../Model/buchDTO.entitie';

export function NeuesBuch() {
	const [isbn, setISBN] = useState('');
	const [titel, setTitel] = useState('');
	const [rabatt, setRabatt] = useState(0.0);
	const [rating, setRating] = useState('');
	const [art, setArt] = useState<BuchArt>('DRUCKAUSGABE');
	const [preis, setPreis] = useState(0.0);
	const [lieferbar, setLieferbar] = useState(false);
	const [datum, setDatum] = useState('');
	const [homepage, setHomepage] = useState('');
	const [schlagwoerter, setSchlagwoerter] = useState<string[] | undefined>(
		undefined,
	);
	const [selectedSchlagwoerter, setSelectedSchlagwoerter] = useState<
		string[]
	>([]);

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

	const handleCreateClick = async () => {
		console.log(isbn);
		console.log(titel);
		console.log(preis);
		console.log(rabatt);
		console.log(
			await mutation({
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
					untertitel: undefined,
				},
				abbildungen: undefined,
			}),
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
							setPreis(parseInt(event.target.value, 10))
						}
					/>
					<Form.Label>Rabatt (in Prozent)</Form.Label>
					<Form.Control
						required
						type="text"
						placeholder="z.B. 10"
						value={rabatt}
						onChange={(event) =>
							setRabatt(parseInt(event.target.value, 10))
						}
					/>
					<Form.Label>Rating (1 - 5 Sterne)</Form.Label>
					<Form.Control
						type=""
						placeholder="z.B. 2"
						value={rating}
						onChange={(event) => setRating(event.target.value)}
					/>
					<input
						type="radio"
						id="DRUCKAUSGABE"
						name="Art"
						value="DRUCKAUSGABE"
						checked="checked" //funktioniert aber fehler muss irgendwann rausgemacht werden
						onChange={(event) => setArt(event.target.value)} //es erkennt nicht dass auf jeden Fall eine Buchart zurück gegeben wird
					/>
					<label id="DRUCKAUSGABE">DRUCKAUSGABE</label>
					<br />
					<input
						type="radio"
						id="KINDLE"
						name="Art"
						value="KINDLE"
						onChange={(event) => setArt(event.target.value)} //es erkennt nicht dass auf jeden Fall eine Buchart zurück gegeben wird
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
