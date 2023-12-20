import { AxiosResponse } from 'axios';
import { axiosInstance } from './getAxiosInstance';

export let token: string;

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
			token = data?.login.token ? data.login.token : 'hat nicht geklappt';
		} catch (error: unknown) {
			throw new Error('Fehler beim GraphQL-Login');
		}
	};

	try {
		await loginGraphQL();
		console.log('Erfolgreich eingeloggt! Token:', token);
		return true;
	} catch (error) {
		console.error('Fehler beim Einloggen:', error);
		return false;
	}
}
