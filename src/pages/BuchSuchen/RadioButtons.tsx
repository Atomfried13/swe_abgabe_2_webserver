import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { fetchTitel } from '../../Controller/buch-query';
import { QueryTitelAusgabe } from './BuchSuchen';
import { ShowTableTitel } from './ShowTableTitel.component';
import { RadioButtons } from './RadioButton.component';

interface SearchRadioButtonsProps {
	setError: React.Dispatch<React.SetStateAction<string>>;
}

// eslint-disable-next-line max-lines-per-function
export function SearchRadioButtons({ setError }: SearchRadioButtonsProps) {
	const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
	const [daten, setDaten] = useState<QueryTitelAusgabe | null>(null);
	const handleRadioClick = async (letter: string) => {
		try {
			if (letter !== '') {
				setDaten((await fetchTitel(letter)).data.data);
			} else {
				setDaten(null);
			}
			setError('');
			setSelectedLetter(letter);
		} catch (error) {
			console.error('Fehler beim Laden der Daten:', error);
			setError('Fehler beim Laden der Daten');
			//setDatenTitel(null);
			throw new Error();
		}
	};
	return (
		<>
			<Form.Group>
				<RadioButtons
					selectedLetter={selectedLetter}
					handleRadioClick={handleRadioClick}
				/>
			</Form.Group>
			<div className="table-container">
				{daten && <ShowTableTitel datenTitel={daten} />}
			</div>
		</>
	);
}
