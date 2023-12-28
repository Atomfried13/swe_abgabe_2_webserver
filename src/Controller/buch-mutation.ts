/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { BuchDTO } from '../Model/buchDTO.entitie';
import { axiosInstance } from './getAxiosInstance';

export const mutation = async (
	buch: BuchDTO,
	token: string,
): Promise<number> => {
	const authorization = { Authorization: token ? `Bearer ${token}` : '' };
	try {
		console.log('am anfang');
		console.log(buch.titel);
		const response = await axiosInstance.post(
			'baseURL/graphql',
			{
				variables: { input: buch },
				query: `
				mutation ($input: BuchInput!) {
					create (input: $input) {
						id
					}
				  }
				`,
			},
			{ headers: authorization },
		);
		console.log('am Ende');
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
