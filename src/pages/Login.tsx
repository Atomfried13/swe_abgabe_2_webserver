import { Form, Button, InputGroup } from 'react-bootstrap';
import './Login.css';
import {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
	const [showPassword, setShowPassword] = useState(false);
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
					<Button className="anmelden-btn">Anmelden</Button>
				</div>
			</Form>
		</div>
	);

};
export default Login;