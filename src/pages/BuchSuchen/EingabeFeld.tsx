// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable max-lines-per-function */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable prettier/prettier */
import { useState } from 'react';
import { fetchId, fetchTitel } from '../../Controller/buch-query';
import { QueryIdAusgabe, QueryTitelAusgabe } from './BuchSuchen';
import { Form } from 'react-bootstrap';
import { EingabeFeldComponent } from './EingabeFeld.component';
import { SubmitButton } from './SubmitButtonQuery.component';
import { ShowTableTitel } from './ShowTableTitel.component';
import { ShowTableId } from './ShowTableID.component';

interface EingabeFeldProps {
	setError: React.Dispatch<React.SetStateAction<string>>;
}

export function EingabeFeld({ setError }: EingabeFeldProps) {
	const [datenTitel, setDatenTitel] = useState<QueryTitelAusgabe | null>(
		null,
	);
	const [datenId, setDatenId] = useState<QueryIdAusgabe | null>(null);
	const [searchTerm, setSearchTerm] = useState('');

	const handleSearchClick = async () => {
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
	};
	return (
		<>
			<Form.Group
				className="buch-suchen-form"
				controlId="formGroupSuchen"
			>
				<EingabeFeldComponent setSearchTerm={setSearchTerm} />
				<SubmitButton
					handleSearchClick={handleSearchClick} />
			</Form.Group>
			<div className="table-container">
				{datenTitel && (
					<ShowTableTitel
						datenTitel={datenTitel} />
				)}
				{datenId && (
					<ShowTableId
						datenId={datenId} />
				)}
			</div>
		</>
	);
}
