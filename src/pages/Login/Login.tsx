import { Form, Button, InputGroup } from 'react-bootstrap';
import { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Einloggen } from '../../Controller/auth.service';
import { AuthContext } from '../../Controller/AuthContext';
import './Login.css';

// eslint-disable-next-line max-lines-per-function
export function Login() {
	const [showPassword, setShowPassword] = useState(false);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [loginSuccess, setLoginSuccess] = useState<boolean | null>(null);
	const [formVisible, setFormVisible] = useState(true);
	const [loading, setLoading] = useState(false);
	const [errMsg, setErrMsg] = useState('');

	const { setToken }: { setToken: (value: string | null) => void } =
		useContext(AuthContext);
	const { setExpiresIn } = useContext(AuthContext);
	const { setTokenIssuedAt } = useContext(AuthContext);

	const handleLogin = () => {
		void (async () => {
			setLoading(true);
			try {
				const response = await Einloggen(username, password);
				console.log(response);
				const token = response.data.data?.login?.token;
				const expiresIn = response.data.data?.login?.expiresIn;
				if (token) {
					setToken(token);
					setLoginSuccess(true);
					setExpiresIn(expiresIn);
					setTokenIssuedAt(new Date());
					setFormVisible(false);
				} else {
					setLoginSuccess(false);
					setErrMsg(response.data.errors[0].message);
				}
			} catch (error) {
				console.error(error);
				setLoginSuccess(false);
			} finally {
				setLoading(false);
			}
		})();
	};

	return (
		<div className="d-flex flex-column align-items-center mt-5">
			<Form className={formVisible ? '' : 'hidden'}>
				<h2 className="text-center mb-4">Login</h2>
				<Form.Group className="eingabe-benutzername-form">
					<Form.Label htmlFor="EingabeBenutzername">
						Benutzername
					</Form.Label>
					<Form.Control
						type="benutzername"
						id="EingabeBenutzername"
						value={username}
						onChange={(event) => setUsername(event.target.value)}
					/>
				</Form.Group>
				<Form.Group className="eingabe-passwort-form">
					<Form.Label htmlFor="EingabePasswort">Passwort</Form.Label>
					<InputGroup>
						<Form.Control
							type={showPassword ? 'text' : 'password'}
							id="EingabePasswort"
							value={password}
							onChange={(event) =>
								setPassword(event.target.value)
							}
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
				<div className="mt-3">
					<Button className="anmelden-btn" onClick={handleLogin}>
						{loading ? 'Lädt...' : 'Anmelden'}
					</Button>
				</div>
			</Form>
			{loginSuccess !== null && (
				<div
					className={
						loginSuccess ? 'success-message' : 'error-message'
					}
				>
					{loginSuccess ? (
						<p>Erfolgreich eingeloggt!</p>
					) : (
						<p>{errMsg ? errMsg : 'Fehler beim Einloggen'}</p>
					)}
				</div>
			)}
		</div>
	);
}
