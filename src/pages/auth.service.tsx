/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { AxiosResponse } from 'axios';
import { axiosInstance } from '../Controller/getAxiosInstance';

export let token: string;

export async function Einloggen(
	username: string,
	password: string,
): Promise<boolean> {
	const loginGraphQL = async (): Promise<string> => {
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
			const token = data.login.token;
			return token;
		} catch (error: unknown) {
			throw new Error('Fehler beim GraphQL-Login');
		}
	};

	try {
		token = await loginGraphQL();
		console.log('Erfolgreich eingeloggt! Token:', token);
		return true;
	} catch (error) {
		console.error('Fehler beim Einloggen:', error);
		return false;
	}
}
