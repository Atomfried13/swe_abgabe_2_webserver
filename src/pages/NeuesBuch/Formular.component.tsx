import { Col, Container, Form, Row } from 'react-bootstrap';
import { Homepage } from './FormularComponents/Homepage.component';
import { Schlagwoerter } from './FormularComponents/Schlagwoerter.component';
import { Lieferbar } from './FormularComponents/Lieferbar.component';
import { Rating } from './FormularComponents/Rating.component';
import { Datum } from './FormularComponents/Datum.component';
import { Rabatt } from './FormularComponents/Rabatt.component';
import { Preis } from './FormularComponents/Preis.component';
import { Isbn } from './FormularComponents/Isbn.component';
import { Art } from './FormularComponents/Art.component';
import { Titel } from './FormularComponents/Titel.component';
import { UnterTitel } from './FormularComponents/UnterTitel.component';
import { SubmitButton } from './FormularComponents/SubmitButton.component';
import { useState } from 'react';
import { BuchDTO } from '../../Model/buchDTO.entitie';

interface FormularProps {
	handleCreate: (buch: BuchDTO) => void;
	setErrorMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
}

// eslint-disable-next-line max-lines-per-function
export function Formular(formularProps: FormularProps) {
	const [isbn, setIsbn] = useState<string>('');
	const [datum, setDatum] = useState<string>('');
	const [titel, setTitel] = useState<string>('');
	const [rabatt, setRabatt] = useState<number>(0);
	const [rating, setRating] = useState<number>(1);
	const [art, setArt] = useState<string>('DRUCKAUSGABE');
	const [preis, setPreis] = useState<number>(0);
	const [lieferbar, setLieferbar] = useState<boolean>(false);
	const [schlagwoerter, setSchlagwoerter] = useState<string[]>([]);
	const [homepage, setHomepage] = useState<string>('');
	const [unterTitel, setUnterTitel] = useState<string>('');

	const handleCreateClick = () => {
		if (!isbn || !titel || preis == 0 || !datum) {
			formularProps.setErrorMessage(
				'Bitte alle notwendigen (*) Felder ausfüllen.',
			);

			return;
		}

		formularProps.handleCreate({
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
			abbildungen: [],
		});
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
