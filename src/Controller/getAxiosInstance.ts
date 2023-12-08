import axios from 'axios';

const axiosInstanceOhneHeader = axios.create({
	baseURL: 'https://localhost:3000/graphql',
});

const headers = {
	'Content-Type': 'application/json',
	Accept: '*/*',
};

axiosInstanceOhneHeader.defaults.headers.common = headers;
export const axiosInstance = axiosInstanceOhneHeader;
