import { AxiosResponse } from 'axios';
import { axiosInstance } from './getAxiosInstance';

interface LoginResponse {
	data: {
		login: {
			token: string;
			roles: string[];
		};
	};
	errors: {
		message: string;
	}[];
}

export async function Einloggen(username: string, password: string) {
	try {
		const response: AxiosResponse<LoginResponse> = await axiosInstance.post(
			'baseURL/',
			{
				variables: { username, password },
				query: `
						mutation {
							login(
								username: "${username}",
								password: "${password}"
							) {
								token,
								roles
							}
						}
					`,
			},
		);
		return response;
	} catch (error) {
		throw new Error('Fehler beim GraphQL-Login');
	}
}
