import axios from 'axios';
import https from 'https';

const axiosInstanceOhneHeader = axios.create({
	baseURL: 'https://localhost:3000/graphql',
	httpsAgent: new https.Agent({
		rejectUnauthorized: false,
	}),
});

const headers = {
	'Content-Type': 'application/json',
	Accept: '*/*',
};

axiosInstanceOhneHeader.defaults.headers.common = headers;
export const axiosInstance = axiosInstanceOhneHeader;
