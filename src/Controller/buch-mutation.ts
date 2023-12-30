/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { BuchDTO } from '../Model/buchDTO.entitie';
import { axiosInstance } from './getAxiosInstance';

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

		const response = await axiosInstance.post(
			'baseURL/graphql',
			{
				variables: { input: buch },
				query,
			},
			{ headers: authorization },
		);

		if (response.data.errors !== undefined) {
			console.log(response.data.errors);
		}
		if (response.data === undefined) {
			console.log('es ist etwas schiefgelaufen');
		}
		console.log('Antwort: ', response.data);
		return response.data.data.create.id;
	} catch (err) {
		console.log('Fehler, Schreiben hat nicht geklappt:', err);
		throw new Error('Fehler beim Anlegen des Buches.');
	}
};
