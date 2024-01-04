import { axiosInstance } from './getAxiosInstance';
import { Buch, BuchListe } from '../Model/buch.entity';
import { AxiosResponse } from 'axios';

interface IdResponse {
	data: { buch: Buch };
	errors?: {
		message: string;
		path?: string[];
		extensions?: Record<string, unknown>;
	}[];
}

interface TitelResponse {
	data: { buecher: BuchListe };
	errors?: {
		message: string;
		path?: string[];
		extensions?: Record<string, unknown>;
	}[];
}

export const fetchId = async (id: string) => {
	try {
		const response: AxiosResponse<IdResponse> = await axiosInstance.post(
			'baseURL/query',
			{
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
			},
		);

		return response;
	} catch (error) {
		throw new Error();
	}
};

export const fetchTitel = async (titel: string) => {
	try {
		const response: AxiosResponse<TitelResponse> = await axiosInstance.post(
			'baseURL/query',
			{
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
			},
		);

		return response;
	} catch (error) {
		throw new Error();
	}
};
