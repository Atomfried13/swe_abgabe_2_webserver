import axios from 'axios';

export const axiosInstance = () =>{
	const axiosInstance = axios.create({
		baseURL: 'https://localhost:3000/graphql',
	});

	const headers = {
		'Content-Type': 'application/json',
		'Accept': '*/*'
	};

	axiosInstance.defaults.headers.common = headers;
	return axiosInstance;
};