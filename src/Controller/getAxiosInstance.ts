import axios, { AxiosInstance } from 'axios';

let axiosInstanceOhneHeader: AxiosInstance;

if (import.meta.env.SSR === true) {
	// Server-side code
	const https = (await import('https')).default;
	const agent = new https.Agent({
		rejectUnauthorized: false,
	});

	axiosInstanceOhneHeader = axios.create({
		baseURL: 'https://localhost:3000/graphql',
		httpsAgent: agent,
	});
} else {
	// Client-side code
	axiosInstanceOhneHeader = axios.create({
		baseURL: 'https://localhost:3000/graphql',
	});
}

const headers = {
	'Content-Type': 'application/json',
	Accept: '*/*',
};

axiosInstanceOhneHeader.defaults.headers.common = headers;
export const axiosInstance = axiosInstanceOhneHeader;
