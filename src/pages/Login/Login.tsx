import { Form, Container, Row, Col } from 'react-bootstrap';
import { useState, useContext } from 'react';
import { einloggen } from '../../Controller/auth';
import { AuthContext } from '../../Controller/AuthContext';
import { BenutzernameInput } from './BenutzernameInput.component';
import { PasswortInput } from './PasswortInput.component';
import { AnmeldenButton } from './AnmeldenButton.component';
import { LoginMessage } from './LoginMessage.component';
import './Login.css';

// eslint-disable-next-line max-lines-per-function
export function Login() {
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [usernameError, setUsernameError] = useState<boolean>(false);
	const [passwordError, setPasswordError] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [errMsg, setErrMsg] = useState<string>('');
	const [formVisible, setFormVisible] = useState<boolean>(true);
	const [loginSuccess, setLoginSuccess] = useState<boolean | undefined>(
		undefined,
	);
	const { setToken } = useContext(AuthContext);
	const { setRoles } = useContext(AuthContext);
	const { setExpiresIn } = useContext(AuthContext);
	const { setTokenIssuedAt } = useContext(AuthContext);

	const handleLogin = () => {
		void (async () => {
			if (!username || !password) {
				setUsernameError(!username);
				setPasswordError(!password);
				setLoginSuccess(undefined);
				return;
			}

			setLoading(true);

			try {
				const response = await einloggen(username, password);
				const login = response.data.data.login ?? null;
				if (login !== null) {
					const { token, expiresIn, roles } = login;
					setToken(token);
					setExpiresIn(expiresIn);
					setTokenIssuedAt(new Date());
					setRoles(roles);
					setLoginSuccess(true);
					setFormVisible(false);
				} else {
					if (response.data.errors !== undefined) {
						setErrMsg(response.data.errors[0].message);
					}
					setLoginSuccess(false);
				}
			} catch (error) {
				setErrMsg(
					'Fehler bei dem Einloggen. Versuche es später erneut.',
				);
				setLoginSuccess(false);
			} finally {
				setLoading(false);
			}
		})();
	};

	return (
		<Container className="login-formular">
			<Form className={formVisible ? '' : 'hidden'}>
				<Row>
					<Col
						lg={{ span: 2, offset: 5 }}
						md={{ span: 2, offset: 5 }}
						sm={{ span: 2, offset: 5 }}
						xs={{ span: 4, offset: 4 }}
						className="text-center"
					>
						<h2>Login</h2>
					</Col>
				</Row>
				<br />
				<Row>
					<Col
						lg={{ span: 4, offset: 4 }}
						md={{ span: 6, offset: 3 }}
						sm={{ span: 8, offset: 2 }}
						xs={{ span: 8, offset: 2 }}
					>
						<BenutzernameInput
							setUsername={setUsername}
							setUsernameError={setUsernameError}
							usernameError={usernameError}
						/>
					</Col>
				</Row>
				<br />
				<Row>
					<Col
						lg={{ span: 4, offset: 4 }}
						md={{ span: 6, offset: 3 }}
						sm={{ span: 8, offset: 2 }}
						xs={{ span: 8, offset: 2 }}
					>
						<PasswortInput
							setPassword={setPassword}
							setPasswordError={setPasswordError}
							passwordError={passwordError}
						/>
					</Col>
				</Row>
				<Row>
					<Col
						lg={{ span: 4, offset: 4 }}
						md={{ span: 6, offset: 3 }}
						sm={{ span: 8, offset: 2 }}
						xs={{ span: 8, offset: 2 }}
					>
						<AnmeldenButton
							handleLogin={handleLogin}
							loading={loading}
						/>
					</Col>
				</Row>
			</Form>
			<Row className="login-message">
				<Col
					lg={{ span: 4, offset: 4 }}
					md={{ span: 6, offset: 3 }}
					sm={{ span: 8, offset: 2 }}
					xs={{ span: 8, offset: 2 }}
				>
					{loginSuccess !== undefined && (
						<LoginMessage
							errMsg={errMsg}
							loginSuccess={loginSuccess}
						/>
					)}
				</Col>
			</Row>
		</Container>
	);
}
