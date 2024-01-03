import { Button } from 'react-bootstrap';

interface SubmitButtonProps {
	handleSearchClick: () => void;
}

export function SubmitButton(props: SubmitButtonProps) {
	return (
		<>
			<Button className="suchen-btn" onClick={props.handleSearchClick}>
				Suchen
			</Button>
		</>
	);
}
