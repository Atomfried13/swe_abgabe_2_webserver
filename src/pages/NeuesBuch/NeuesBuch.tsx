import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './NeuesBuch.css';

const NeuesBuch = () => {
	const [isbn, setISBN] = useState('');
	const [titel, setTitel] = useState('');
	const [preis, setPreis] = useState('');
	const [rabatt, setRabatt] = useState('');
	
	const handleCreateClick = () => {
		//Methode aufrufen mit der ein HTTP Request an die GraphQL Schnittstelle zum Neuanlegen gemacht wird 
	};

	return(
		<div>
			<div className="infos">
				<h2>Neuanlegen eines Buches</h2>
			</div>
			<Form onSubmit={handleCreateClick}>
				<Form.Group controlId='validationISBN'>
					<Form.Label>ISBN</Form.Label>
					<Form.Control
						required
						type="text"
						placeholder="z.B. 0-0070-0644-6"
						value={isbn}
						onChange={(event) => setISBN(event.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId='validationISBN'>
					<Form.Label>Titel</Form.Label>
					<Form.Control
						required
						type="text"
						placeholder="z.B. Learning React"
						value={titel}
						onChange={(event) => setTitel(event.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId='validationISBN'>
					<Form.Label>Preis</Form.Label>
					<Form.Control
						required
						type=""
						placeholder="z.B. 30"
						value={preis}
						onChange={(event) => setPreis(event.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId='validationISBN'>
					<Form.Label>Rabatt (in Prozent)</Form.Label>
					<Form.Control
						required
						type="text"
						placeholder="z.B. 10"
						value={rabatt}
						onChange={(event) => setRabatt(event.target.value)}
					/>
				</Form.Group>
				<Button type="submit" className="neuanlegen-btn">Neues Buch anlegen</Button>
			</Form>
		</div>
	);
};
export default NeuesBuch;