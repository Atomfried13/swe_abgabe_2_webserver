import { Alert } from 'react-bootstrap';
import './Login.css';

interface LoginMessageProps {
	loginSuccess: boolean | undefined;
	errMsg: string;
}

export function LoginMessage({ loginSuccess, errMsg }: LoginMessageProps) {
	return (
		<div>
			{loginSuccess ? (
				<Alert className="text-center" variant="success">
					Erfolgreich eingeloggt!
				</Alert>
			) : (
				<Alert className="text-center" variant="danger">
					{errMsg}
				</Alert>
			)}
		</div>
	);
}
