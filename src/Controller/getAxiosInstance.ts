import axios, { AxiosInstance } from 'axios';

let axiosInstanceOhneHeader: AxiosInstance;

if (import.meta.env.SSR === true) {
	const https = (await import('https')).default;
	const agent = new https.Agent({
		rejectUnauthorized: false,
	});

	axiosInstanceOhneHeader = axios.create({
		baseURL: 'https://localhost:3000/graphql',
		httpsAgent: agent,
	});
} else {
	axiosInstanceOhneHeader = axios.create({
		baseURL: 'https://localhost:3000/graphql',
		httpsAgent: { rejectUnauthorized: false },
	});
}

const headers = {
	'Content-Type': 'application/json',
	Accept: '*/*',
};

axiosInstanceOhneHeader.defaults.headers.common = headers;
export const axiosInstance = axiosInstanceOhneHeader;
