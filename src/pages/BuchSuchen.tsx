import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import './BuchSuchen.css';
import { axiosInstance } from '../Controller/getAxiosInstance';

const BuchSuchen = () => {
	const [data, set] = useState(null);
	const [titel, setTitel] = useState('');
	
	const fetchTitel = async () => {
		try {
			const response = await axiosInstance.post('baseURL/query', {
				variables: { titel }, //a??
				query: `
		query ($titel: String) {
			buecher(titel: $titel) {
			isbn
			art
			preis
			schlagwoerter
			rating
			titel {
			  titel
			}
		  }
		}
		`,
			});
			set(response.data);
			console.log(response.data);
		} catch (err: unknown) {
			console.log('Fehler, genauere Fehlermeldung noch nicht vorhanden, schaue in die Konsole des Browsers');
		} // Fehlermedlung noch ausbauen !!!!!!!
	};

	const handleSearchClick_Titel = () => {
		fetchTitel();
	};

	return (
		<><div className="d-flex align-items-center">
			<Form>
				<Form.Group className="buch-suchen-form" controlId="formGroupSuchen">
					<Form.Control 
						type="suchkriterien" 
						placeholder="Suche anhand des Titels..." 
						value={titel}
						onChange={(event) => setTitel(event.target.value)}
					/>
				</Form.Group>
			</Form>
			<Button onClick={handleSearchClick_Titel} className="suchen-btn">Suchen</Button>
		</div>
		<Table striped bordered hover>
			<thead>
				<tr>
					<th>Nr.</th>
					<th>Titel</th>
					<th>Preis</th>
					<th>Art</th>
					<th>Bewertung</th>
				</tr>
			</thead>
			<tbody>
				{data?.data.buecher.map((buch, index) => (
					<tr key={index}>
						<td>{index + 1}</td>
						<td>{buch.titel?.titel}</td>
						<td>{buch.preis}</td>
						<td>{buch.art}</td>
						<td>{buch.rating}</td>
					</tr>
				))}
			</tbody>
		</Table></>
	);
};

export default BuchSuchen;
