import { axiosInstance } from './getAxiosInstance';
import { AxiosResponse } from 'axios';
import { Buch, BuchListe } from '../Model/buch.entity';

export const fetchId = async (id: string) => {
	let response: AxiosResponse<{
		status: number;
		headers: string;
		data: { buch: Buch };
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

		let errorMessage = '';

		if (response.data.data.buch == null) {
			errorMessage = `Ein Buch mit der ID${id} existiert nicht.`;
		}

		const { status, headers, data } = response;
		const result = { status, headers, data, errorMessage };

		return result;
	} catch (error) {
		throw new Error();
	}
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

		let errorMessage = '';

		if (response.data.data.buecher == null) {
			errorMessage = `Ein Buch mit dem Titel oder dem Teiltitel "${titel}" existiert nicht.`;
		}

		const { status, headers, data } = response;
		const result = { status, headers, data, errorMessage };

		return result;
	} catch (error) {
		throw new Error();
	}
};
