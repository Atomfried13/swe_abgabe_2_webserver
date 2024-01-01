import { Form, InputGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

interface PasswortProps {
	setPassword: React.Dispatch<React.SetStateAction<string>>;
	showPassword: boolean;
	setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Passwort({
	showPassword,
	setShowPassword,
	setPassword,
}: PasswortProps) {
	return (
		<Form.Group className="eingabe-passwort-form">
			<Form.Label htmlFor="EingabePasswort" className="passwort-label">
				Passwort
			</Form.Label>
			<InputGroup>
				<Form.Control
					type={showPassword ? 'text' : 'password'}
					id="EingabePasswort"
					onChange={(event) => setPassword(event.target.value)}
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
	);
}
