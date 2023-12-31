import React from 'react';
import { Form } from 'react-bootstrap';

interface SearchRadioButtonsProps {
	selectedLetter: string | null;
	handleRadioClick: (letter: string) => void;
}

export const SearchRadioButtons = ({ selectedLetter, handleRadioClick }: SearchRadioButtonsProps) => (
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
);
