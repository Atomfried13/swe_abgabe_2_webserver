import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { fetchId } from '../../../Controller/buch-query';
import { IdTable } from '../Ausgabe/IdTable.component';
import { QueryIdDaten } from '../../../Model/buch.entity';
import { CheckBoxId1, CheckBoxId20 } from './CheckBoxAuswahl.component';

interface CheckBoxVerarbeitungProps {
	setError: React.Dispatch<React.SetStateAction<string>>;
}

export function CheckBoxVerarbeitung({ setError }: CheckBoxVerarbeitungProps) {
	const [datenCheckBoxId1, setDatenCheckBoxId1] =
		useState<QueryIdDaten | null>(null);
	const [showTableCheckBoxId1, setShowTableCheckBoxId1] =
		useState<boolean>(false);
	const [datenCheckBoxId20, setDatenCheckBoxId20] =
		useState<QueryIdDaten | null>(null);
	const [showTableCheckBoxId20, setShowTableCheckBoxId20] =
		useState<boolean>(false);

	const handleCheckBoxChange = (id: string) => {
		void (async () => {
			try {
				switch (true) {
					case id === '1': {
						setShowTableCheckBoxId1(!showTableCheckBoxId1);
						setDatenCheckBoxId1((await fetchId(id)).data.data);
						setError('');
						break;
					}

					case id === '20': {
						setShowTableCheckBoxId20(!showTableCheckBoxId20);
						setDatenCheckBoxId20((await fetchId(id)).data.data);
						setError('');
						break;
					}
				}
			} catch (error) {
				setError('Fehler bei dem Laden der Daten');
			}
		})();
	};

	return (
		<>
			<Form.Group>
				<CheckBoxId1 handleCheckBoxChange={handleCheckBoxChange} />
				<CheckBoxId20 handleCheckBoxChange={handleCheckBoxChange} />
			</Form.Group>
			<div className="table-container">
				{showTableCheckBoxId1 && datenCheckBoxId1 && (
					<IdTable datenId={datenCheckBoxId1} />
				)}
				{showTableCheckBoxId20 && datenCheckBoxId20 && (
					<IdTable datenId={datenCheckBoxId20} />
				)}
			</div>
		</>
	);
}
