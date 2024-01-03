import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { fetchTitel } from '../../Controller/buch-query';
import { QueryTitelDaten } from './BuchSuchen';
import { TableTitel } from './TableTitel.component';
import { RadioButtonAuswahl } from './RadioButtonAuswahl.component';

interface RadioButtonVerarbeitungProps {
	setError: React.Dispatch<React.SetStateAction<string>>;
}

export function RadioButtonVerarbeitung({
	setError,
}: RadioButtonVerarbeitungProps) {
	const [daten, setDaten] = useState<QueryTitelDaten | null>(null);

	const handleRadioClick = (letter: string) => {
		void (async () => {
			try {
				if (letter !== '') {
					setDaten((await fetchTitel(letter)).data.data);
				} else {
					setDaten(null);
				}
				setError('');
			} catch (error) {
				//console.error('Fehler beim Laden der Daten:', error);
				setError('Fehler beim Laden der Daten');
				//throw new Error();
			}
		})();
	};

	return (
		<>
			<Form.Group>
				<RadioButtonAuswahl handleRadioClick={handleRadioClick} />
			</Form.Group>
			<div className="table-container">
				{daten && <TableTitel datenTitel={daten} />}
			</div>
		</>
	);
}
