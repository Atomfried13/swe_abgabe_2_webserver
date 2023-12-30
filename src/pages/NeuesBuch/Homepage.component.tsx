import { Form } from 'react-bootstrap';

export interface HomepageUebertragung {
	homepage: string;
	setHomepage: React.Dispatch<React.SetStateAction<string>>;
}

export function Homepage(homepageUebertragung: HomepageUebertragung) {
	return (
		<>
			<Form.Label>Homepage</Form.Label>
			<Form.Control
				type="text"
				placeholder="z.B. https://h-ka.de"
				value={homepageUebertragung.homepage}
				onChange={(event) =>
					homepageUebertragung.setHomepage(event.target.value)
				}
			/>
		</>
	);
}
