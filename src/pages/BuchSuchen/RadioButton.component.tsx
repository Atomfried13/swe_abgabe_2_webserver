import React from 'react';
import { Form } from 'react-bootstrap';

interface RadioButtonsProps {
	selectedLetter: string | null;
	handleRadioClick: (letter: string) => void;
}

export function RadioButtons({
	selectedLetter,
	handleRadioClick,
}: RadioButtonsProps) {
	return (
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
			<Form.Check
				inline
				type="radio"
				label=""
				name="searchLetter"
				id="searchLetter"
				onChange={() => handleRadioClick('')}
				checked={selectedLetter === ''}
			/>
		</Form.Group>
	);
}
