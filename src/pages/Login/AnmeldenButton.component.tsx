import { Button } from 'react-bootstrap';

interface AnmeldenButtonProps {
	handleLogin: () => void;
	loading: boolean;
}

export function AnmeldenButton({ handleLogin, loading }: AnmeldenButtonProps) {
	return (
		<Button className="anmelden-btn" onClick={handleLogin}>
			{loading ? 'Lädt...' : 'Anmelden'}
		</Button>
	);
}
