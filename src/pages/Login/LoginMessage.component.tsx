import { Alert } from 'react-bootstrap';

interface LoginMessageProps {
	loginSuccess: boolean | undefined;
	errMsg: string;
}

export function LoginMessage({ loginSuccess, errMsg }: LoginMessageProps) {
	return (
		<div className={loginSuccess ? 'success-message' : 'error-message'}>
			{loginSuccess ? (
				<Alert className="text-center">Erfolgreich eingeloggt!</Alert>
			) : (
				<Alert className="text-center">
					{errMsg ? errMsg : 'Fehler beim Einloggen'}
				</Alert>
			)}
		</div>
	);
}
