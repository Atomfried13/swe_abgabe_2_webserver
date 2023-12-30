import { Button } from 'react-bootstrap';

interface SubmitButtonHandleSearchClick {
	handleSearchClick: () => void;
}

export function SubmitButton(
	submitButtonHandleSearchClick: SubmitButtonHandleSearchClick,
) {
	return (
		<>
			<Button
				className="suchen-btn"
				onClick={submitButtonHandleSearchClick.handleSearchClick}
			>
				Suchen
			</Button>
		</>
	);
}
