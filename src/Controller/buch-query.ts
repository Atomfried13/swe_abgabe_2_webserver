import { axiosInstance } from './getAxiosInstance';
import { AxiosResponse } from 'axios';
interface BuchData {
	id: string;
	isbn: string;
	version: number;
	preis: number;
	rating: number;
	art: string;
	rabatt: string;
	titel: {
		titel: string;
	};
}

interface QueryResultId {
	data: {
		buch: BuchData;
	};
}

interface QueryResultTitel {
	data: {
		buecher: BuchData[];
	};
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
						schlagwoerter
						rating
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
