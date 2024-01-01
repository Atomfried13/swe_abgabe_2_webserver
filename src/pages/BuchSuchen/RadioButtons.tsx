import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { fetchTitel } from '../../Controller/buch-query';
import { QueryIdAusgabe, QueryTitelAusgabe } from './BuchSuchen';
import { ShowTableTitel } from './ShowTableTitel.component';

interface SearchRadioButtonsProps {
	setError: React.Dispatch<React.SetStateAction<string>>;
	setDatenId: React.Dispatch<React.SetStateAction<QueryIdAusgabe | null>>;
	setDatenTitel: React.Dispatch<
		React.SetStateAction<QueryTitelAusgabe | null>
	>;
	//setSelectedLetter: React.Dispatch<React.SetStateAction<string | null>>;
}

export function SearchRadioButtons({
	setError,
	setDatenId,
	setDatenTitel,
}: SearchRadioButtonsProps) {
	const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
	const [daten, setDaten] = useState<QueryTitelAusgabe | null>(null);
	const handleRadioClick = async (letter: string) => {
		try {
			setDatenId(null);
			setDatenTitel(null);
			setDaten((await fetchTitel(letter)).data.data);
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
				<Form.Check
					inline
					type="radio"
					label="A"
					name="searchLetter"
					id="searchLetterA"
					onChange={() => handleRadioClick('A')}
					checked={selectedLetter === 'A'}
				/>
				<Form.Check
					inline
					type="radio"
					label="L"
					name="searchLetter"
					id="searchLetterL"
					onChange={() => handleRadioClick('L')}
					checked={selectedLetter === 'L'}
				/>
			</Form.Group>
			<div className="table-container">
				{daten && <ShowTableTitel datenTitel={daten} />}
			</div>
		</>
	);
}
