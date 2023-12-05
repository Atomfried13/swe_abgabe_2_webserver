import { BuchDTOohneref } from './buchDTO.entitie';
import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: 'https://localhost:3000/graphql',
});

const headers = {
	'Content-Type': 'application/json',
	'Content-Length': 'calculated when request is sent',
	Host: 'calculated when request is sent',
	Accept: '*/*',
	'Accept-Encoding': 'gzip, deflate, br',
	Connection: 'keep-alive',
};

export class WriteController {
	construktor() {}

	async post(buchohneref: BuchDTOohneref) {
		axiosInstance.defaults.headers.common = headers;
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
			return response.error.message;
		}
		return 'Neues Buch angelegt.';
	}
}
