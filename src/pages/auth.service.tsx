import { AxiosResponse } from 'axios';
import { axiosInstance } from '../Controller/getAxiosInstance';

const Einloggen = async (username: string, password: string): Promise<boolean> => {
	const loginGraphQL = async (): Promise<string> => {
		
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
			const data = response.data.data!;
			const token = data.login.token;
			return token;
		} catch (error) {
			throw new Error('Fehler beim GraphQL-Login: ' + error.message);
		}
	};

	try {
		const token = await loginGraphQL();
		console.log('Erfolgreich eingeloggt! Token:', token);
		return true;
	} catch (error) {
		console.error('Fehler beim Einloggen:', error);
		return false;
	}
};
export default Einloggen;