import { Button } from 'react-bootstrap';

export interface SubmitButtonHandleCreateClick {
	handleCreateClick: () => void;
}

export function SubmitButton(
	submitButtonhandleCreateClick: SubmitButtonHandleCreateClick,
) {
	return (
		<>
			<Button
				onClick={submitButtonhandleCreateClick.handleCreateClick}
				type="submit"
				className="buch-schreiben-form"
			>
				Neues Buch anlegen
			</Button>
		</>
	);
}
