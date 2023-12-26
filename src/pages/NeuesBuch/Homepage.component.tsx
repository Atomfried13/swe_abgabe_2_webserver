import { Form } from 'react-bootstrap';

export interface HomepageUebertragung {
	homepage: string;
	setHomepage: React.Dispatch<React.SetStateAction<string>>;
}

export function Homepage(homepageUeertragung: HomepageUebertragung) {
	return (
		<>
			<Form.Label>Homepage</Form.Label>
			<Form.Control
				type="text"
				placeholder="z.B. https://h-ka.de"
				value={homepageUeertragung.homepage}
				onChange={(event) =>
					homepageUeertragung.setHomepage(event.target.value)
				}
			/>
		</>
	);
}
