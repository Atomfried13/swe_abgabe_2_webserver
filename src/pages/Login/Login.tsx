import {
	Form,
	Button,
	InputGroup,
	Container,
	Row,
	Col,
	Alert,
} from 'react-bootstrap';
import { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Einloggen } from '../../Controller/auth.service';
import { AuthContext } from '../../Controller/AuthContext';
import './Login.css';

// eslint-disable-next-line max-lines-per-function
export function Login() {
	const [showPassword, setShowPassword] = useState(false);
	const [password, setPassword] = useState('');
	const [loginSuccess, setLoginSuccess] = useState<boolean | null>(null);
	const [formVisible, setFormVisible] = useState(true);
	const [loading, setLoading] = useState(false);
	const [errMsg, setErrMsg] = useState('');

	const { setToken } = useContext(AuthContext);
	const { setExpiresIn } = useContext(AuthContext);
	const { setTokenIssuedAt } = useContext(AuthContext);
	const { username } = useContext(AuthContext);
	const { setUsername } = useContext(AuthContext);
	const { setRoles } = useContext(AuthContext);

	const handleLogin = async () => {
		setLoading(true);

		try {
			const response = await Einloggen(username, password);
			console.log(response);
			const token = response.data.data?.login?.token;
			const expiresIn = response.data.data?.login?.expiresIn;
			const roles = response.data.data?.login?.roles;
			if (token) {
				setToken(token);
				setLoginSuccess(true);
				setExpiresIn(expiresIn);
				setTokenIssuedAt(new Date());
				setRoles(roles);
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
	};

	return (
		<Container className="login-formular">
			<Form className={formVisible ? '' : 'hidden'}>
				<Row>
					<Col lg={{ span: 4, offset: 4 }}>
						<h2 className="text-center mb-4">Login</h2>
					</Col>
				</Row>
				<Row>
					<Col
						lg={{ span: 6, offset: 3 }}
						md={{ span: 9, offset: 2 }}
					>
						<Form.Group className="eingabe-benutzername-form">
							<Form.Label htmlFor="EingabeBenutzername" className="benutzername-label">
								Benutzername
							</Form.Label>
							<Form.Control
								type="benutzername"
								id="EingabeBenutzername"
								onChange={(event) =>
									setUsername(event.target.value)
								}
							/>
						</Form.Group>
					</Col>
				</Row>
				<Row>
					<Col
						lg={{ span: 6, offset: 3 }}
						md={{ span: 9, offset: 2 }}
					>
						<Form.Group className="eingabe-passwort-form">
							<Form.Label
								htmlFor="EingabePasswort"
								className="passwort-label"
							>
								Passwort
							</Form.Label>
							<InputGroup>
								<Form.Control
									type={showPassword ? 'text' : 'password'}
									id="EingabePasswort"
									onChange={(event) =>
										setPassword(event.target.value)
									}
								/>
								<Button
									onClick={() =>
										setShowPassword(!showPassword)
									}
								>
									{showPassword ? (
										<FontAwesomeIcon icon={faEyeSlash} />
									) : (
										<FontAwesomeIcon icon={faEye} />
									)}
								</Button>
							</InputGroup>
						</Form.Group>
					</Col>
				</Row>
				<Row>
					<Col
						lg={{ span: 6, offset: 3 }}
						md={{ span: 9, offset: 2 }}
					>
						<div className="mt-3">
							<Button
								className="anmelden-btn"
								onClick={handleLogin}
							>
								{loading ? 'Lädt...' : 'Anmelden'}
							</Button>
						</div>
					</Col>
				</Row>
			</Form>
			<Row className="login-message">
				<Col lg={{ span: 6, offset: 3 }} md={{ span: 9, offset: 2 }}>
					{loginSuccess !== null && (
						<div
							className={
								loginSuccess
									? 'success-message'
									: 'error-message'
							}
						>
							{loginSuccess ? (
								<Alert className="text-center">
									Erfolgreich eingeloggt!
								</Alert>
							) : (
								<Alert className="text-center">
									{errMsg ? errMsg : 'Fehler beim Einloggen'}
								</Alert>
							)}
						</div>
					)}
				</Col>
			</Row>
		</Container>
	);
}
