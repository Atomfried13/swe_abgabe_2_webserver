//import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import './Login.css';
import {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

interface LoginProps {
	onLogin: (username: string, password: string) => Promise<void>;
	onClose: () => void;
  }
  
export function Login({ onLogin, onClose }: LoginProps) {
	const [showPassword, setShowPassword] = useState(false);
  
	const handleLogin = async () => {
		const usernameInput = document.getElementById('EingabeBenutzername') as HTMLInputElement;
		const passwordInput = document.getElementById('EingabePasswort') as HTMLInputElement;
		const username = usernameInput.value; // lieber mit react hooks machen, noch ändern!!!
		const password = passwordInput.value;
  
		try {
			await onLogin(username, password);
		} catch (error) {
			console.error('Fehler beim Einloggen:', error);
		}
	};
	return (
		<div className="form-container">
			<Form>
				<Form.Group className = "eingabe-benutzername-form">
					<Form.Label htmlFor="EingabeBenutzername">Benutzername</Form.Label>
					<Form.Control type="benutzername" id="EingabeBenutzername"/>
				</Form.Group>
				<Form.Group className = "eingabe-passwort-form">
					<Form.Label htmlFor="EingabePasswort">Passwort</Form.Label>
					<InputGroup>
						<Form.Control type= {showPassword ? 'text' : 'password'} id="EingabePasswort"/>
						<Button onClick={() => setShowPassword(!showPassword)}>
							{showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
						</Button>
					</InputGroup>
				</Form.Group>
				<div className="button-container">
					<Button className="anmelden-btn" onClick={handleLogin}>Anmelden</Button>
					<Button onClick={onClose}>Abbrechen</Button>
				</div>
			</Form>
		</div>
	);

}