/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { fetchId } from '../../Controller/buch-query';
import { ShowTableId } from './ShowTableID.component';
import { QueryIdAusgabe } from './BuchSuchen';

// eslint-disable-next-line max-lines-per-function
export function SearchCheckboxId1() {
	const [datenBoxId1, setDatenBoxId1] = useState<QueryIdAusgabe | null>(null);
	const [showTableBoxId1, setShowTableBoxId1] = useState(false);
	const [datenBoxId20, setDatenBoxId20] = useState<QueryIdAusgabe | null>(
		null,
	);
	const [showTableBoxId20, setShowTableBoxId20] = useState(false);

	const handleCheckboxChange = async (id: string) => {
		try {
			switch (true) {
			case id === '1': {
				setShowTableBoxId1(!showTableBoxId1);
				setDatenBoxId1((await fetchId(id)).data.data);
				//setError('');
				break;
			}
			case id === '20': {
				setShowTableBoxId20(!showTableBoxId20);
				setDatenBoxId20((await fetchId(id)).data.data);
				//setError('');
				break;
			}
			}
		} catch (error) {
			console.error('Fehler beim Laden der Daten:', error);
			//setError('Fehler beim Laden der Daten');
			//setDatenBoxId1(null);
			//setDatenBoxId20(null);
			//setShowTableBoxId1(false);
			//setShowTableBoxId20(false);
			throw new Error();
		}
	};
	return (
		<>
			<Form.Group>
				<Form.Check
					inline
					type="checkbox"
					label="ID 1"
					id="checkboxId1"
					onChange={() => handleCheckboxChange('1')}
					checked={showTableBoxId1}
				/>
				<Form.Check
					inline
					type="checkbox"
					label="ID 20"
					id="checkboxId20"
					onChange={() => handleCheckboxChange('20')}
					checked={showTableBoxId20}
				/>
			</Form.Group>
			<div className="table-container">
				{showTableBoxId1 && datenBoxId1 && (
					<ShowTableId datenId={datenBoxId1} />
				)}
				{showTableBoxId20 && datenBoxId20 && (
					<ShowTableId
						datenId={datenBoxId20}
					/>
				)}
			</div>
		</>
	);
}