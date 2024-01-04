import { useState } from 'react';
import { fetchId, fetchTitel } from '../../Controller/buch-query';
import { QueryIdDaten, QueryTitelDaten } from './BuchSuchen';
import { Form } from 'react-bootstrap';
import { EingabeFeldInput } from './EingabeFeldInput.component';
import { SubmitButton } from './SubmitButtonQuery.component';
import { TitelTable } from './TitelTable.component';
import { IdTable } from './IdTable.component';

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
						setError(
							'Bei deiner Eingabe handelt es sich nicht um einen gültigen Teiltitel oder einer gültigen ID.',
						);
				}
			} catch (error) {
				setError('Fehler bei dem Laden der Daten');
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
				{datenTitel && <TitelTable datenTitel={datenTitel} />}
				{datenId && <IdTable datenId={datenId} />}
			</div>
		</>
	);
}
