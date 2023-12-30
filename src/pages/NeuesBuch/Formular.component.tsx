import { Form } from 'react-bootstrap';
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
import { useState } from 'react';
import { BuchDTO } from '../../Model/buchDTO.entitie';

interface FormularUebertragung {
	handleCreate: (buch: BuchDTO) => void;
}

export function Formular(formularUebertragung: FormularUebertragung) {
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

	const handleCreateClick = () => {
		if (isbn !== '' && titel !== '' && preis > 0) {
			formularUebertragung.handleCreate({
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
			});
		} else {
			console.log('Unvollständige oder Falsche Eingabe');
		}
	};
	return (
		<>
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
				<SubmitButton submitHandleCreateClick={handleCreateClick} />
			</Form>
		</>
	);
}
