import { Form, Container, Row, Col } from 'react-bootstrap';
import { useState, useContext } from 'react';
import { Einloggen } from '../../Controller/auth.service';
import { AuthContext } from '../../Controller/AuthContext';
import { BenutzernameInput } from './BenutzernameInput.component';
import { Passwort } from './PasswortInput.component';
import { AnmeldenButton } from './AnmeldenButton.component';
import { LoginMessage } from './LoginMessage.component';
import './Login.css';

// eslint-disable-next-line max-lines-per-function
export function Login() {
	const [showPassword, setShowPassword] = useState(false);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [loginSuccess, setLoginSuccess] = useState<boolean | undefined>(
		undefined,
	);
	const [formVisible, setFormVisible] = useState(true);
	const [loading, setLoading] = useState(false);
	const [errMsg, setErrMsg] = useState('');

	const { setToken } = useContext(AuthContext);
	const { setExpiresIn } = useContext(AuthContext);
	const { setTokenIssuedAt } = useContext(AuthContext);
	const { setRoles } = useContext(AuthContext);

	const handleLogin = () => {
		void (async () => {
			setLoading(true);

			try {
				const response = await Einloggen(username, password);
				console.log(response);
				const token = response.data.data?.login?.token;
				const expiresIn = response.data.data?.login?.expiresIn;
				const roles = response.data.data?.login?.roles;
				console.log(roles);
				if (token) {
					setToken(token);
					setLoginSuccess(true);
					setExpiresIn(expiresIn);
					setTokenIssuedAt(new Date());
					setRoles(roles);
					setFormVisible(false);
				} else {
					setLoginSuccess(false);
					if (response.data.errors != undefined) {
						setErrMsg(response.data.errors[0].message);
					}
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
						<BenutzernameInput setUsername={setUsername} />
					</Col>
				</Row>
				<Row>
					<Col
						lg={{ span: 4, offset: 4 }}
						md={{ span: 6, offset: 3 }}
						sm={{ span: 8, offset: 2 }}
						xs={{ span: 8, offset: 2 }}
					>
						<Passwort
							setPassword={setPassword}
							showPassword={showPassword}
							setShowPassword={setShowPassword}
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
