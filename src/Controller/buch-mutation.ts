/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-duplicate-disable */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { BuchDTO } from '../Model/buchDTO.entitie';
import { axiosInstance } from './getAxiosInstance';

export const mutation = async (buch: BuchDTO, token: string) => {
	console.log(token);
	const authorization = { Authorization: token ? `Bearer ${token}` : '' };
	try {
		console.log('am anfang');
		console.log(buch.isbn);
		const isbn = buch.isbn;
		console.log(isbn);
		const response = await axiosInstance.post(
			'baseURL/graphql',
			{
				variables: { isbn },
				query: `
				mutation ($isbn: String!) {
					create (input: 
						{
							isbn: $isbn,
							rating: 1,
							art: KINDLE,
							preis: 99.99,
							rabatt: 0.123,
							lieferbar: true,
							datum: "2022-01-31",
							homepage: "https://create.mutation",
							schlagwoerter: ["JAVASCRIPT", "TYPESCRIPT"],
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
				  }
				`,
			},
			{ headers: authorization },
		);
		console.log('am ende angekommen');
		if (response.data.errors !== undefined) {
			console.log(response.data.errors);
		}
		console.log('Antwort: ', response.data);
		return response.data;
	} catch (err) {
		console.log('Fehler, Schreiben hat nicht geklappt:', err);
		throw new Error('Fehler beim Anlegen des Buches.');
	}
};
