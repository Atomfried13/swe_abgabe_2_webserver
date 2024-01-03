import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { fetchId } from '../../Controller/buch-query';
import { TableId } from './TableId.component';
import { QueryIdDaten } from './BuchSuchen';
import { CheckBoxId1, CheckBoxId20 } from './CheckBoxAuswahl.component';

interface CheckBoxVerarbeitungProps {
	setError: React.Dispatch<React.SetStateAction<string>>;
}

export function CheckBoxVerarbeitung({ setError }: CheckBoxVerarbeitungProps) {
	const [datenCheckBoxId1, setDatenCheckBoxId1] =
		useState<QueryIdDaten | null>(null);
	const [showTableCheckBoxId1, setShowTableCheckBoxId1] = useState(false);
	const [datenCheckBoxId20, setDatenCheckBoxId20] =
		useState<QueryIdDaten | null>(null);
	const [showTableCheckBoxId20, setShowTableCheckBoxId20] = useState(false);

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
				//console.error('Fehler beim Laden der Daten:', error);
				setError('Fehler beim Laden der Daten');
				//throw new Error();
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
					<TableId datenId={datenCheckBoxId1} />
				)}
				{showTableCheckBoxId20 && datenCheckBoxId20 && (
					<TableId datenId={datenCheckBoxId20} />
				)}
			</div>
		</>
	);
}
