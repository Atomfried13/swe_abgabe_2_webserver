import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { fetchTitel } from '../../Controller/buch-query';
import { QueryTitelAusgabe } from './BuchSuchen';
import { ShowTableTitel } from './ShowTableTitel.component';
import { RadioButtons } from './RadioButton.component';

interface SearchRadioButtonsProps {
	setError: React.Dispatch<React.SetStateAction<string>>;
}

export function SearchRadioButtons({ setError }: SearchRadioButtonsProps) {
	const [daten, setDaten] = useState<QueryTitelAusgabe | null>(null);

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
				console.error('Fehler beim Laden der Daten:', error);
				setError('Fehler beim Laden der Daten');
				throw new Error();
			}
		})();
	};

	return (
		<>
			<Form.Group>
				<RadioButtons handleRadioClick={handleRadioClick} />
			</Form.Group>
			<div className="table-container">
				{daten && <ShowTableTitel datenTitel={daten} />}
			</div>
		</>
	);
}
