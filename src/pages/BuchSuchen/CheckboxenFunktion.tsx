import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { fetchId } from '../../Controller/buch-query';
import { TableID } from './TableID.component';
import { QueryIdAusgabe } from './BuchSuchen';
import { SearchCheckboxId1, SearchCheckboxId20 } from './Checkbox.component';

interface SearchCheckboxIdProps {
	setError: React.Dispatch<React.SetStateAction<string>>;
}

export function SearchCheckboxId({ setError }: SearchCheckboxIdProps) {
	const [datenBoxId1, setDatenBoxId1] = useState<QueryIdAusgabe | null>(null);
	const [showTableBoxId1, setShowTableBoxId1] = useState(false);
	const [datenBoxId20, setDatenBoxId20] = useState<QueryIdAusgabe | null>(
		null,
	);
	const [showTableBoxId20, setShowTableBoxId20] = useState(false);

	const handleCheckboxChange = (id: string) => {
		void (async () => {
			try {
				switch (true) {
					case id === '1': {
						setShowTableBoxId1(!showTableBoxId1);
						setDatenBoxId1((await fetchId(id)).data.data);
						setError('');
						break;
					}

					case id === '20': {
						setShowTableBoxId20(!showTableBoxId20);
						setDatenBoxId20((await fetchId(id)).data.data);
						setError('');
						break;
					}
				}
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
				<SearchCheckboxId1
					handleCheckboxChange={handleCheckboxChange}
				/>
				<SearchCheckboxId20
					handleCheckboxChange={handleCheckboxChange}
				/>
			</Form.Group>
			<div className="table-container">
				{showTableBoxId1 && datenBoxId1 && (
					<TableID datenId={datenBoxId1} />
				)}
				{showTableBoxId20 && datenBoxId20 && (
					<TableID datenId={datenBoxId20} />
				)}
			</div>
		</>
	);
}
