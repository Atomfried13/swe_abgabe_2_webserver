import { Form, InputGroup } from 'react-bootstrap';

interface BenutzernameProps {
	setUsername: React.Dispatch<React.SetStateAction<string>>;
}

export function BenutzernameInput({ setUsername }: BenutzernameProps) {
	return (
		<Form.Group className="eingabe-benutzername-form">
			<Form.Label
				htmlFor="EingabeBenutzername"
				className="benutzername-label"
			>
				Benutzername
			</Form.Label>
			<InputGroup>
				<Form.Control
					type="benutzername"
					id="EingabeBenutzername"
					onChange={(event) => setUsername(event.target.value)}
				/>
			</InputGroup>
		</Form.Group>
	);
}
