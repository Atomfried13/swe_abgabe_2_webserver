import { BuchDTO } from '../Model/buchDTO.entitie';
import { axiosInstance } from './getAxiosInstance';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';

export const mutation = async (buch: BuchDTO) => {
	const { token } = useContext(AuthContext);
	const authorization = { Authorization: token ? `${token}` : '' };
	try {
		const response = await axiosInstance.post(
			'baseURL/graphql',
			{
				query: `
					mutation CreateNewBook($input: BuchInput!) {
						create(input: $input) {
							id
						}
					}
				`,
				variables: {
					input: {
						isbn: buch.isbn,
						rating: buch.rating,
						art: buch.art,
						preis: buch.preis,
						rabatt: buch.rabatt,
						lieferbar: buch.lieferbar,
						datum: buch.datum,
						homepage: buch.homepage,
						schlagwoerter: buch.schlagwoerter,
						titel: {
							titel: buch.titel.titel,
							untertitel: buch.titel.untertitel,
						},
						abbildungen: buch.abbildungen?.map((abbildung) => ({
							beschriftung: abbildung.beschriftung,
							contentType: abbildung.contentType,
						})),
					},
				},
			},
			{ headers: authorization },
		);

		console.log('Antwort: ', response.data);
		return 'Neues Buch angelegt.';
	} catch (err) {
		console.log('Fehler, Schreiben hat nicht geklappt:', err);
		throw new Error('Fehler beim Anlegen des Buches.');
	}
};
