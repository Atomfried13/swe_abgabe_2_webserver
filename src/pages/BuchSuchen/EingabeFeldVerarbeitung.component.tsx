import { useState } from 'react';
import { fetchId, fetchTitel } from '../../Controller/buch-query';
import { QueryIdAusgabe, QueryTitelAusgabe } from './BuchSuchen';
import { Form } from 'react-bootstrap';
import { EingabeFeldInput } from './EingabeFeldInput.component';
import { SubmitButton } from './SubmitButtonQuery.component';
import { TableTitel } from './TableTitel.component';
import { TableID } from './TableID.component';

interface EingabeFeldVerarbeitungProps {
	setError: React.Dispatch<React.SetStateAction<string>>;
}

export function EingabeFeldVerarbeitung({
	setError,
}: EingabeFeldVerarbeitungProps) {
	const [datenTitel, setDatenTitel] = useState<QueryTitelAusgabe | null>(
		null,
	);
	const [datenId, setDatenId] = useState<QueryIdAusgabe | null>(null);
	const [searchTerm, setSearchTerm] = useState('');

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
						const { data } = await fetchTitel(searchTerm);

						if (data.errorMessage == '') {
							setDatenTitel(data.data);
						} else {
							setError(data.errorMessage);
						}
						break;
					}

					case !isNaN(Number(searchTerm)): {
						const { data } = await fetchId(searchTerm);

						if (data.errorMessage == '') {
							setDatenId(data.data);
						} else {
							setError(data.errorMessage);
						}
						break;
					}

					default:
						setError('Mach kein Scheiße, gib was Gescheites an');
				}
			} catch (error) {
				setError('Fehler beim Laden der Daten');
				throw new Error(); //?
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
				{datenId && <TableID datenId={datenId} />}
			</div>
		</>
	);
}
