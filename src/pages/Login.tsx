import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Login.css';

const Login = () => {
	return (
		<div className="form-container">
			<Form>
				<Form.Group className = "eingabe-benutzername-form">
					<Form.Label htmlFor="EingabeBenutzername">Benutzername</Form.Label>
					<Form.Control type="benutzername" id="EingabeBenutzername"/>
				</Form.Group>
				<Form.Group className = "eingabe-passwort-form">
					<Form.Label htmlFor="EingabePasswort">Passwort</Form.Label>
					<Form.Control type="passwort" id="EingabePasswort"/>
				</Form.Group>
				<div className="button-container">
					<Button className="anmelden-btn">Anmelden</Button>
				</div>
			</Form>
		</div>
	);

};
export default Login;