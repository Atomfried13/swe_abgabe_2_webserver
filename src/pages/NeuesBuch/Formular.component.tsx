import { Col, Container, Form, Row } from 'react-bootstrap';
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

// eslint-disable-next-line max-lines-per-function
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
		<Container>
			<Form>
				<Form.Group
					controlId="buch-anlegen"
					className="buch-anlegen-form"
				>
					<Row>
						<Col lg={{ span: 6, offset: 3 }}>
							<Isbn setIsbn={setIsbn} />
							<Titel setTitel={setTitel} />
							<UnterTitel setUnterTitel={setUnterTitel} />
							<Form.Check
								required
								label="fill in"
								feedback="You must fill in the required fields."
								feedbackType="invalid"
							/>
						</Col>
					</Row>
					<br />
					<Row>
						<Col lg={{ span: 2, offset: 3 }} md={{ span: 12 }}>
							<Preis setPreis={setPreis} />
						</Col>
						<Col lg={{ span: 2 }} md={{ span: 12 }}>
							<Rabatt setRabatt={setRabatt} />
						</Col>
						<Col lg={{ span: 2 }} md={{ span: 12 }}>
							<Rating setRating={setRating} />
						</Col>
					</Row>
					<br />
					<Row>
						<Col
							lg={{ span: 3, offset: 3 }}
							md={{ span: 3, offset: 3 }}
							sm={{ span: 4 }}
						>
							<Lieferbar setLieferbar={setLieferbar} />
							<br />
							<Art setArt={setArt} />
						</Col>
						<Col lg={{ span: 3 }} md={{ span: 3 }} sm={{ span: 4 }}>
							<Schlagwoerter
								schlagwoerter={schlagwoerter}
								setSchlagwoerter={setSchlagwoerter}
							/>
						</Col>
					</Row>
					<br />
					<Row>
						<Col lg={{ span: 6, offset: 3 }}>
							<Datum setDatum={setDatum} />
							<Homepage setHomepage={setHomepage} />
						</Col>
					</Row>
				</Form.Group>
				<SubmitButton submitHandleCreateClick={handleCreateClick} />
			</Form>
		</Container>
	);
}
