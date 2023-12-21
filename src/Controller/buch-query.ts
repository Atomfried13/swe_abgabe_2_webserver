import { axiosInstance } from './getAxiosInstance';
import { AxiosResponse } from 'axios';

/*interface BuchData {
	id: string;
	isbn: string;
	art: string;
	preis: number;
	rating: number;
	rabatt: string;
	titel: {
		titel: string;
	};
}*/
interface QueryResultId {
	id: string;
	isbn: string;
	art: string;
	preis: number;
	rating: number;
	rabatt: string;
	titel: {
		titel: string;
	};
}

interface QueryResultTitel {
	id: string;
	isbn: string;
	art: string;
	preis: number;
	rating: number;
	rabatt: string;
	titel: {
		titel: string;
	}[];
}
export const fetchId = async (id: string) => {
	let response: AxiosResponse<{ data: { buch: QueryResultId } }>;
	try {
		response = await axiosInstance.post('baseURL/query', {
			variables: { id },
			query: `
				query ($id: ID!) {
					buch(id: $id) {
						id
						isbn
						art
						preis
						rating
						rabatt
						titel {
			  				titel
						}
					}
				}
				`,
		});
	} catch (error) {
		console.error('Fehler beim Laden des Querys:', error);
		//console.log(
		//'Fehler, genauere Fehlermeldung noch nicht vorhanden, schaue in die Konsole des Browsers',
		//);
		throw new Error();
	}
	console.log('Ergebnis der API:', response);
	return response.data;
};

export const fetchTitel = async (titel: string) => {
	let response: AxiosResponse<{ data: { buecher: QueryResultTitel } }>; // buecher
	try {
		response = await axiosInstance.post('baseURL/query', {
			variables: { titel },
			query: `
				query ($titel: String) {
					buecher(titel: $titel) {
						id
						isbn
						art
						preis
						rating
						rabatt
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
