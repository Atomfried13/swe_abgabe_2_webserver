import { AxiosResponse } from 'axios';
import { axiosInstance } from './getAxiosInstance';

interface LoginResponse {
	data: {
		login: {
			token: string;
			roles: string[];
			expiresIn: string;
		};
	};
	errors?: {
		message: string;
		path?: string[];
		extensions?: Record<string, unknown>;
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
								roles,
								expiresIn
							}
						}
					`,
			},
		);
		return response;
	} catch (error) {
		//console.error('Fehler bei der Anfrage:', error);
		throw new Error();
	}
}
