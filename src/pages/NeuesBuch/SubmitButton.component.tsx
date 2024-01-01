import { Button } from 'react-bootstrap';

interface SubmitButtonHandleCreateClick {
	submitHandleCreateClick: () => void;
}

export function SubmitButton(
	submitButtonhandleCreateClick: SubmitButtonHandleCreateClick,
) {
	return (
		<>
			<Button
				onClick={submitButtonhandleCreateClick.submitHandleCreateClick}
				type="submit"
				className="neuanlegen-btn"
			>
				Neues Buch anlegen
			</Button>
		</>
	);
}
