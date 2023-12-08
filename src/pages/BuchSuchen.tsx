import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './BuchSuchen.css';

const BuchSuchen = () => {
	return (
		<div className="d-flex align-items-center">
			<Form>
				<Form.Group className="buch-suchen-form" controlId="formGroupSuchen">
					<Form.Control type="suchkriterien" placeholder="Suche anhand des Titels..." />
				</Form.Group>
			</Form>
			<Button className="suchen-btn">Suchen</Button>
		</div>
	);
};

export default BuchSuchen;
