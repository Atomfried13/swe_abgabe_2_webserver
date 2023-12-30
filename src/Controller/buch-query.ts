import { axiosInstance } from './getAxiosInstance';
import { AxiosResponse } from 'axios';
import { ReactNode } from 'react';

export interface Buch {
	id: string;
	isbn: string;
	art: string;
	preis: number;
	rating: number;
	rabatt: string;
	schlagwoerter: string[];
	lieferbar: boolean;
	titel: {
		titel: string;
	};
}

export interface BuchListe {
	map(mapFunction: (buch: Buch, index: number) => ReactNode): ReactNode;
	buecher: Buch[];
}
export const fetchId = async (id: string) => {
	let response: AxiosResponse<{
		status: number;
		headers: string;
		data: { buch: Buch }; //data?: { buch: Buch };
		//error?: string; //WWWWWWWWWW
	}>;
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
						schlagwoerter
						lieferbar
						titel {
			  				titel
						}
					}
				}
				`,
		});
	} catch (error) {
		console.error('Fehler beim Laden des Querys:', error);
		throw new Error(); //....
	}
	console.log('Ergebnis der API:', response);
	return response;
};

export const fetchTitel = async (titel: string) => {
	let response: AxiosResponse<{
		status: number;
		headers: string;
		data: { buecher: BuchListe };
	}>;
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
						schlagwoerter
						lieferbar
						titel {
			  				titel
						}
	  				}
				}
			`,
		});
	} catch (error) {
		console.error('Fehler beim Laden des Querys:', error);
		throw new Error();
	}
	console.log('Ergebnis der API:', response);
	return response;
};
