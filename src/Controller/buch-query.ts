/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { axiosInstance } from './getAxiosInstance';

export const fetchId = async (id: string) => {
	let response;
	try {
		response = await axiosInstance.post('baseURL/query', {
			variables: { id }, //a??
			query: `
				query ($id: ID!) {
					buch(id: $id) {
						isbn
						art
						preis
						schlagwoerter
						rating
						titel {
			  				titel
						}
					}
				}
				`,
		});
	} catch (err: unknown) {
		console.log(
			'Fehler, genauere Fehlermeldung noch nicht vorhanden, schaue in die Konsole des Browsers',
		);
		throw new Error();
	}
	return response.data;
};

export const fetchTitel = async (titel: string) => {
	let response;
	try {
		response = await axiosInstance.post('baseURL/query', {
			variables: { titel },
			query: `
				query ($titel: String) {
					buecher(titel: $titel) {
						isbn
						art
						preis
						schlagwoerter
						rating
						titel {
			  				titel
						}
	  				}
				}
			`,
		});
	} catch (err: unknown) {
		console.log(
			'Fehler, genauere Fehlermeldung noch nicht vorhanden, schaue in die Konsole des Browsers',
		);
		throw new Error();
	}
	return response.data;
};
