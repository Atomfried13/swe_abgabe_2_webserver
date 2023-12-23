import { AxiosResponse } from 'axios';
import { axiosInstance } from './getAxiosInstance';

export async function Einloggen(username: string, password: string) {
	try {
		const response: AxiosResponse = await axiosInstance.post('baseURL/', {
			variables: { username, password },
			query: `
						mutation {
							login(
								username: "${username}",
								password: "${password}"
							) {
								token
							}
						}
					`,
		});
		return response.data.data.login.token;
	} catch (error) {
		throw new Error('Fehler beim GraphQL-Login');
	}
}
