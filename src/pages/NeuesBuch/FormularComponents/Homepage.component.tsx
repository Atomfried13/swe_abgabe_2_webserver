import { Form } from 'react-bootstrap';

interface HomepageProps {
	setHomepage: React.Dispatch<React.SetStateAction<string>>;
}

export function Homepage(homepageProps: HomepageProps) {
	return (
		<>
			<Form.Label>Homepage</Form.Label>
			<Form.Control
				type="text"
				placeholder="z.B. https://h-ka.de"
				onChange={(event) =>
					homepageProps.setHomepage(event.target.value)
				}
			/>
		</>
	);
}
