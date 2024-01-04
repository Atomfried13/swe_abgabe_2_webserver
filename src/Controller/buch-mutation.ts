import { AxiosResponse } from 'axios';
import { BuchDTO } from '../Model/buchDTO.entitie';
import { axiosInstance } from './getAxiosInstance';

interface CreateResponse {
	data: {
		create: {
			id: number;
		};
	};
	errors?: {
		message: string;
	}[];
}

export const mutation = async (buch: BuchDTO, token: string) => {
	try {
		const authorization = { Authorization: token ? `Bearer ${token}` : '' };

		const query = `
			mutation ($input: BuchInput!) {
				create (input: $input) {
					id
				}
			}
		`;

		const response: AxiosResponse<CreateResponse> =
			await axiosInstance.post(
				'baseURL/graphql',
				{
					variables: { input: buch },
					query,
				},
				{ headers: authorization },
			);

		return response;
	} catch (error) {
		throw new Error();
	}
};
