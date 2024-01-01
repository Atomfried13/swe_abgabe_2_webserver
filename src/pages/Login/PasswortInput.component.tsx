import { Form, InputGroup, Button } from 'react-bootstrap';
import { ChangeEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './Login.css';

interface PasswortProps {
	setPassword: React.Dispatch<React.SetStateAction<string>>;
	showPassword: boolean;
	setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
	setPasswordError: React.Dispatch<React.SetStateAction<boolean>>;
	passwordError: boolean;
}

export function Passwort({
	showPassword,
	setShowPassword,
	setPassword,
	setPasswordError,
	passwordError,
}: PasswortProps) {
	const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
		setPasswordError(false);
	};
	return (
		<Form.Group className="eingabe-passwort-form">
			<Form.Label htmlFor="EingabePasswort" className="passwort-label">
				Passwort
			</Form.Label>
			<InputGroup>
				<Form.Control
					type={showPassword ? 'text' : 'password'}
					id="EingabePasswort"
					onChange={handlePasswordChange}
					isInvalid={passwordError}
				/>
				<Button
					onClick={() => setShowPassword(!showPassword)}
					className="showPasswordBtn"
				>
					{showPassword ? (
						<FontAwesomeIcon icon={faEyeSlash} />
					) : (
						<FontAwesomeIcon icon={faEye} />
					)}
				</Button>
				<Form.Control.Feedback type="invalid">
					Bitte geben Sie ein Passwort ein.
				</Form.Control.Feedback>
			</InputGroup>
		</Form.Group>
	);
}
