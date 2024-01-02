import { AxiosResponse } from 'axios';
import { BuchDTO } from '../Model/buchDTO.entitie';
import { axiosInstance } from './getAxiosInstance';

interface CreateResponse {
	data: {
		create: {
			id: number;
		};
	};
	errors?: {
		message: string;
	}[];
}

export const mutation = async (
	buch: BuchDTO,
	token: string,
): Promise<number> => {
	try {
		const authorization = { Authorization: token ? `Bearer ${token}` : '' };

		const query = `
			mutation ($input: BuchInput!) {
				create (input: $input) {
					id
				}
			}
		`;

		const response: AxiosResponse<CreateResponse> =
			await axiosInstance.post(
				'baseURL/graphql',
				{
					variables: { input: buch },
					query,
				},
				{ headers: authorization },
			);

		console.log('Ende Anfrage');
		if (response.data.errors !== undefined) {
			console.log(response.data.errors);
		}
		if (response.data === undefined) {
			console.log('es ist etwas schiefgelaufen');
		}
		console.log('Antwort: ', response.data);
		return response.data.data.create.id;
	} catch (error) {
		throw new Error('Fehler beim Anlegen des Buches: $error');
	}
};
