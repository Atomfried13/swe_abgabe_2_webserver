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
	if (response.error !== null || response.error !== undefined) {
		return 'Fehler';
	}
	return 'Neues Buch angelegt.';
};
