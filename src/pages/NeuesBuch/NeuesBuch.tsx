/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-lines-per-function */
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './NeuesBuch.css';
import { mutation } from '../../Controller/buch-mutation';

export function NeuesBuch() {
	const [isbn, setISBN] = useState('');
	const [titel, setTitel] = useState('');
	const [rabatt, setRabatt] = useState('');
	const [rating, setRating] = useState(undefined);
	const [art, setArt] = useState(undefined);
	const [preis, setPreis] = useState('');
	const [lieferbar, setLieferbar] = useState(false);
	const [datum, setDatum] = useState(undefined);
	const [homepage, setHomepage] = useState('');
	const [schlagwoerter, setSchlagwoerter] = useState(undefined);

	const handleCreateClick = async () => {
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
						onChange={(event) => setPreis(event.target.value)}
					/>
					<Form.Label>Rabatt (in Prozent)</Form.Label>
					<Form.Control
						required
						type="text"
						placeholder="z.B. 10"
						value={rabatt}
						onChange={(event) => setRabatt(event.target.value)}
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
		</div>
	);
}
