import { BuchDTOohneref } from './buchDTO.entitie';
import { axiosInstance } from './getAxiosInstance';

export const mutation = async (buchohneref: BuchDTOohneref) => {
	try{
		await axiosInstance.post('baseURL/graphql', {
			mutation: `   
			create(
				input: {
					isbn: ${buchohneref.isbn},
					rating: ${buchohneref.isbn},
					art: ${buchohneref.isbn},
					preis: ${buchohneref.isbn},
					rabatt: ${buchohneref.isbn},
					lieferbar: ${buchohneref.isbn},
					datum: ${buchohneref.isbn},
					homepage: ${buchohneref.isbn},
					schlagwoerter: ${buchohneref.isbn},
					titel: {
						titel: "Titelcreatemutation",
						untertitel: "untertitelcreatemutation"
					},
					abbildungen: [{
					beschriftung: "Abb. 1",
					contentType: "img/png"
					}]
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
