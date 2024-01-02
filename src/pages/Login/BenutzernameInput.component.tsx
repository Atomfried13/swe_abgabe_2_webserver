import { Form, InputGroup } from 'react-bootstrap';
import { ChangeEvent } from 'react';

interface BenutzernameProps {
	setUsername: React.Dispatch<React.SetStateAction<string>>;
	setUsernameError: React.Dispatch<React.SetStateAction<boolean>>;
	usernameError: boolean;
}

export function BenutzernameInput({
	setUsername,
	setUsernameError,
	usernameError,
}: BenutzernameProps) {
	const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
		setUsername(event.target.value);
		setUsernameError(false);
	};
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
					type="text"
					id="EingabeBenutzername"
					onChange={handleUsernameChange}
					isInvalid={usernameError}
				/>
				<Form.Control.Feedback type="invalid">
					Bitte geben Sie einen Benutzernamen ein.
				</Form.Control.Feedback>
			</InputGroup>
		</Form.Group>
	);
}
