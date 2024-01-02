import { Button, Col, Row } from 'react-bootstrap';

interface SubmitButtonHandleCreateClick {
	submitHandleCreateClick: () => void;
}

export function SubmitButton(
	submitButtonhandleCreateClick: SubmitButtonHandleCreateClick,
) {
	return (
		<>
			<Row>
				<Col lg={{ span: 4, offset: 4 }}>
					<Button
						onClick={
							submitButtonhandleCreateClick.submitHandleCreateClick
						}
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
