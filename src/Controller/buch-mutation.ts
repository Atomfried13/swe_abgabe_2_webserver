/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable indent */
import { BuchDTO } from '../Model/buchDTO.entitie';
import { axiosInstance } from './getAxiosInstance';

export const mutation = async (buch: BuchDTO, token: string | null) => {
	const authorization = { Authorization: token ? `${token}` : '' };
	try {
		await axiosInstance.post(
			'baseURL/mutation',
			{
				variables: { buch },
				mutation: `{
				mutation(
					  isbn: "978-0-321-19368-1",
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
				) {
					id
				}}`,
			},
			{ headers: authorization },
		);
	} catch (err: unknown) {
		console.log('Fehler, Schreiben hat nicht geklappt');
		throw new Error();
	}
	console.log('er ist am ende ohne fehler angekommen');
	return 'Neues Buch angelegt.';
};
