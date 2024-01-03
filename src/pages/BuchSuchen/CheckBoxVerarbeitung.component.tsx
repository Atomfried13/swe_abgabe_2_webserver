import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { fetchId } from '../../Controller/buch-query';
import { TableID } from './TableID.component';
import { QueryIdDaten } from './BuchSuchen';
import { CheckBoxId1, CheckBoxId20 } from './CheckBoxAuswahl.component';

interface CheckBoxVerarbeitungProps {
	setError: React.Dispatch<React.SetStateAction<string>>;
}

export function CheckBoxVerarbeitung({ setError }: CheckBoxVerarbeitungProps) {
	const [datenCheckBoxID1, setDatenCheckBoxID1] =
		useState<QueryIdDaten | null>(null);
	const [showTableCheckBoxID1, setShowTableCheckBoxID1] = useState(false);
	const [datenCheckBoxID20, setDatenCheckBoxID20] =
		useState<QueryIdDaten | null>(null);
	const [showTableCheckBoxId20, setShowTableCheckBoxId20] = useState(false);

	const handleCheckBoxChange = (id: string) => {
		void (async () => {
			try {
				switch (true) {
					case id === '1': {
						setShowTableCheckBoxID1(!showTableCheckBoxID1);
						setDatenCheckBoxID1((await fetchId(id)).data.data);
						setError('');
						break;
					}

					case id === '20': {
						setShowTableCheckBoxId20(!showTableCheckBoxId20);
						setDatenCheckBoxID20((await fetchId(id)).data.data);
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
				<CheckBoxId1 handleCheckBoxChange={handleCheckBoxChange} />
				<CheckBoxId20 handleCheckBoxChange={handleCheckBoxChange} />
			</Form.Group>
			<div className="table-container">
				{showTableCheckBoxID1 && datenCheckBoxID1 && (
					<TableID datenId={datenCheckBoxID1} />
				)}
				{showTableCheckBoxId20 && datenCheckBoxID20 && (
					<TableID datenId={datenCheckBoxID20} />
				)}
			</div>
		</>
	);
}
