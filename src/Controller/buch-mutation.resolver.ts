import { BuchDTOohneref } from './buchDTO.entitie';
import { axiosInstance } from './getAxiosInstance';

export const mutation = async(buchohneref: BuchDTOohneref) => {
	const response = await axiosInstance.post('baseURL/graphql', {
		mutation: `
			  query GetBookData {
				book {
				  ${buchohneref}
				}
			  }
			`,
	});
	if (response.error !== null || response.error !== undefined) {
		return 'Fehler';
	}
	return 'Neues Buch angelegt.';
};
