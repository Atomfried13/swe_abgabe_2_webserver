import { useState } from 'react';
import { fetchId, fetchTitel } from '../../Controller/buch-query';
import { QueryIdDaten, QueryTitelDaten } from './BuchSuchen';
import { Form } from 'react-bootstrap';
import { EingabeFeldInput } from './EingabeFeldInput.component';
import { SubmitButton } from './SubmitButtonQuery.component';
import { TableTitel } from './TableTitel.component';
import { TableId } from './TableId.component';

interface EingabeFeldVerarbeitungProps {
	setError: React.Dispatch<React.SetStateAction<string>>;
}

export function EingabeFeldVerarbeitung({
	setError,
}: EingabeFeldVerarbeitungProps) {
	const [datenTitel, setDatenTitel] = useState<QueryTitelDaten | null>(null);
	const [datenId, setDatenId] = useState<QueryIdDaten | null>(null);
	const [searchTerm, setSearchTerm] = useState<string>('');

	const handleSearchClick = () => {
		void (async () => {
			try {
				setError('');
				setDatenId(null);
				setDatenTitel(null);

				switch (true) {
					case searchTerm === '': {
						setDatenTitel((await fetchTitel(searchTerm)).data.data);
						break;
					}

					case isNaN(Number(searchTerm)): {
						const responseTitel = await fetchTitel(searchTerm);

						if (responseTitel.errorMessage == '') {
							setDatenTitel(responseTitel.data.data);
						} else {
							setError(responseTitel.errorMessage);
						}
						break;
					}

					case !isNaN(Number(searchTerm)): {
						const respondeId = await fetchId(searchTerm);

						if (respondeId.errorMessage == '') {
							setDatenId(respondeId.data.data);
						} else {
							setError(respondeId.errorMessage);
						}
						break;
					}

					default:
						setError('Mach kein Scheiße, gib was Gescheites an');
				}
			} catch (error) {
				setError('Fehler beim Laden der Daten');
				//throw new Error(); //Ü
			}
		})();
	};

	return (
		<>
			<Form.Group
				className="buch-suchen-form"
				controlId="formGroupSuchen"
			>
				<EingabeFeldInput setSearchTerm={setSearchTerm} />
				<SubmitButton handleSearchClick={handleSearchClick} />
			</Form.Group>
			<div className="table-container">
				{datenTitel && <TableTitel datenTitel={datenTitel} />}
				{datenId && <TableId datenId={datenId} />}
			</div>
		</>
	);
}
