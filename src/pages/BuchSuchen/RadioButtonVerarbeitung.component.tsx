import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { fetchTitel } from '../../Controller/buch-query';
import { QueryTitelDaten } from './BuchSuchen';
import { TitelTable } from './TitelTable.component';
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
				setError('Fehler bei dem Laden der Daten');
			}
		})();
	};

	return (
		<>
			<Form.Group>
				<RadioButtonAuswahl handleRadioClick={handleRadioClick} />
			</Form.Group>
			<div className="table-container">
				{daten && <TitelTable datenTitel={daten} />}
			</div>
		</>
	);
}
