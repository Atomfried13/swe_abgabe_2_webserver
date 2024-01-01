import React from 'react';
import { Form } from 'react-bootstrap';

interface SearchCheckboxesProps {
	handleCheckboxChange: (id: string) => void; // Ändern Sie hier auf "void"
	checked: boolean;
}

export function SearchCheckboxId1({
	handleCheckboxChange,
	checked,
}: SearchCheckboxesProps) {
	return (
		<Form.Check
			inline
			type="checkbox"
			label="ID 1"
			id="checkboxId1"
			onChange={() => handleCheckboxChange('1')}
			checked={checked}
		/>
	);
}

export function SearchCheckboxId20({
	handleCheckboxChange,
	checked,
}: SearchCheckboxesProps) {
	return (
		<Form.Check
			inline
			type="checkbox"
			label="ID 20"
			id="checkboxId20"
			onChange={() => handleCheckboxChange('20')}
			checked={checked}
		/>
	);
}
