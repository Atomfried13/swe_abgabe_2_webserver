import { Button, Col, Row } from 'react-bootstrap';

interface SubmitButtonProps {
	submitHandleCreateClick: () => void;
}

export function SubmitButton(submitButtonProps: SubmitButtonProps) {
	return (
		<>
			<Row>
				<Col lg={{ span: 4, offset: 4 }}>
					<Button
						onClick={submitButtonProps.submitHandleCreateClick}
						type="button"
						className="neuanlegen-btn"
					>
						Neues Buch anlegen
					</Button>
				</Col>
			</Row>
		</>
	);
}
