import { Form, Button, InputGroup } from 'react-bootstrap';
import './Login.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Einloggen } from '../../Controller/auth.service';

// eslint-disable-next-line max-lines-per-function
export function Login() {
	const [showPassword, setShowPassword] = useState(false);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [loginSuccess, setLoginSuccess] = useState<boolean | null>(null);
	const [formVisible, setFormVisible] = useState(true);

	const handleLogin = async () => {
		const usernameInput = document.getElementById(
			'EingabeBenutzername',
		) as HTMLInputElement;
		const passwordInput = document.getElementById(
			'EingabePasswort',
		) as HTMLInputElement;
		setUsername(usernameInput.value);
		setPassword(passwordInput.value);

		try {
			const erfolg = await Einloggen(username, password);
			setLoginSuccess(erfolg);
			if (erfolg) {
				setFormVisible(false);
			}
		} catch (error) {
			console.error('Fehler beim Einloggen:', error);
		}
	};
	return (
		<div className="form-container">
			<Form className={formVisible ? '' : 'hidden'}>
				<Form.Group className="eingabe-benutzername-form">
					<Form.Label htmlFor="EingabeBenutzername">
						Benutzername
					</Form.Label>
					<Form.Control
						type="benutzername"
						id="EingabeBenutzername"
					/>
				</Form.Group>
				<Form.Group className="eingabe-passwort-form">
					<Form.Label htmlFor="EingabePasswort">Passwort</Form.Label>
					<InputGroup>
						<Form.Control
							type={showPassword ? 'text' : 'password'}
							id="EingabePasswort"
						/>
						<Button onClick={() => setShowPassword(!showPassword)}>
							{showPassword ? (
								<FontAwesomeIcon icon={faEyeSlash} />
							) : (
								<FontAwesomeIcon icon={faEye} />
							)}
						</Button>
					</InputGroup>
				</Form.Group>
				<div className="button-container">
					<Button className="anmelden-btn" onClick={handleLogin}>
						Anmelden
					</Button>
				</div>
			</Form>
			{loginSuccess !== null && (
				<div
					className={
						loginSuccess ? 'success-message' : 'error-message'
					}
				>
					{loginSuccess
						? 'Erfolgreich eingeloggt!'
						: 'Fehler beim Einloggen'}
				</div>
			)}
		</div>
	);
}
