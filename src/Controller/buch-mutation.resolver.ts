import { BuchDTO } from '../Model/buchDTO.entitie';
import { axiosInstance } from './getAxiosInstance';

export const mutation = async (buch: BuchDTO) => {
	try{
		await axiosInstance.post('baseURL/graphql', {
			mutation: `   
			create(
				input: {
					isbn: ${buch.isbn},
					rating: ${buch.rating},
					art: ${buch.art},
					preis: ${buch.preis},
					rabatt: ${buch.rabatt},
					lieferbar: ${buch.lieferbar},
					datum: ${buch.datum?.toString()},
					homepage: ${buch.homepage},
					schlagwoerter: ${buch.schlagwoerter?.toString()},
					titel: {
						titel: ${buch.titel.titel},
						untertitel: ${buch.titel.untertitel}
					},
					${buch.abbildungen === undefined ? '' : 'abbildungen: {[' +
	//			`"${buch.abbildungen.forEach(abbildung => 'beschriftung:' + abbildung.beschriftung)}"` + ',' +
	//		`"${buch.abbildungen.forEach(abbildung => 'contentType:' + abbildung.contentType)}"` +
						']},'},
				}
			) {
				id
			}
			}`,
		});
	} catch (err: unknown) {
		return 'Fehler beim Schreiben';
	}
	return 'Neues Buch angelegt.';
};
