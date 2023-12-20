import { AxiosResponse } from 'axios';
import { axiosInstance } from './getAxiosInstance';

export async function Einloggen(username: string, password: string) {
	const loginGraphQL = async () => {
		try {
			const response: AxiosResponse = await axiosInstance.post(
				'baseURL/',
				{
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
				},
			);
			const data = response.data.data!;
			const token = data?.login.token
				? data.login.token
				: 'hat nicht geklappt';
			return token;
		} catch (error: unknown) {
			throw new Error('Fehler beim GraphQL-Login');
		}
	};

	try {
		const token = await loginGraphQL();
		console.log('Erfolgreich eingeloggt! Token:', token);
		return token !== null;
	} catch (error) {
		console.error('Fehler beim Einloggen:', error);
		return false;
	}
}
