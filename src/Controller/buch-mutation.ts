/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable indent */
import { BuchDTO } from '../Model/buchDTO.entitie';
import { axiosInstance } from './getAxiosInstance';

export const mutation = async (buch: BuchDTO, token: string) => {
	const authorization = { Authorization: `Bearer ${token}` };
	try {
		await axiosInstance.post(
			'baseURL/graphql',
			{
				mutation: `
				create(
					input: {
						isbn: ${buch.isbn},
						${buch.rating ? 'rating: ' + buch.rating + ',' : ''}
						${buch.art ? 'art: ' + buch.art + ',' : ''}
						preis: ${buch.preis},
						${buch.rabatt ? 'rabatt: ' + buch.rabatt + ',' : ''}
						${buch.lieferbar ? 'lieferbar: ' + buch.lieferbar + ',' : ''}
						${buch.datum ? 'datum:' + buch.datum.toString() + ',' : ''}
						${buch.homepage ? 'homepage: ' + buch.homepage + ',' : ''}
						${
							buch.schlagwoerter
								? 'schlagwoerter: ' +
								  buch.schlagwoerter.toString() +
								  ','
								: ''
						}
						titel: {
							titel: ${buch.titel.titel},
							${buch.titel.untertitel ? 'untertitel: ' + buch.titel.untertitel + ',' : ''}
						},
						${
							buch.abbildungen
								? 'abbildungen: [' +
								  buch.abbildungen.forEach((abbildung) => {
										'{' +
											'datum:' +
											abbildung.beschriftung +
											',' +
											'datum:' +
											abbildung.contentType +
											'}';
								  }) +
								  '],'
								: ''
						},
					}
				) {
					id
				}`,
			},
			{ headers: authorization },
		);
	} catch (err: unknown) {
		return 'Fehler beim Schreiben';
	}
	return 'Neues Buch angelegt.';
};
