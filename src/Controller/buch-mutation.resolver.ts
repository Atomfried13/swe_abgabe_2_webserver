/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BuchDTOohneref } from './buchDTO.entitie';
import { axiosInstance } from './getAxiosInstance';

export const mutation = async (buchohneref: BuchDTOohneref) => {
	const response = await axiosInstance.post('baseURL/graphql', {
		mutation: `   
		create(
			input: {
				isbn: "978-0-321-19368-1",
      			rating: 1,
      			art: KINDLE,
      			preis: 99.99,
      			rabatt: 0.123,
      			lieferbar: true,
      			datum: "2022-01-31",
      			homepage: "https://create.mutation",
      			schlagwoerter: ["JAVASCRIPT", "TYPESCRIPT"],
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
	if (response.error !== null || response.error !== undefined) {
		return 'Fehler';
	}
	return 'Neues Buch angelegt.';
};
