/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-duplicate-disable */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useState } from 'react';
import React from 'react';
import './App.css';
import { axiosInstance } from './Controller/getAxiosInstance';

export function App() {
	const [error] = useState(null);
	const [data, set] = useState(null);
	const [id, setId] = useState('1');

	const fetch = async () => {
		try {
	  const response = await axiosInstance.post('baseURL/query', {
				variables: { id }, //a??
				query: `
		query ($id: ID!) {
		  buch(id: $id) {
			isbn
			version
			art
			rabatt(short: true)
			titel {
			  titel
			}
		  }
		}
		`,
	  });
  
	  set(response.data);
		} catch (err: unknown) {
			console.log('Fehler, genauere Fehlermeldung noch nicht vorhanden, schaue in die Konsole des Browsers');
		} // Fehlermedlung noch ausbauen !!!!!!!
	};
	// eslint-disable-next-line @typescript-eslint/no-floating-promises
	fetch();

	return (
		<><div>
			<h1>Vite + React Gruppe 4 beste Gruppe</h1>
			<h2>GraphQL-Daten:</h2>
			<h1> Gib ne Id an !!!!!!!!????????</h1>
			<input
           		type="number"
           		value={id}
           	 	onChange={(ereignis) => setId(ereignis.target.value)}
			/>
			<div>
		  		<h2>GraphQL-Daten:</h2>
		  		{data ? (
					<pre>{JSON.stringify(data, null, 1)}</pre>
		  		) : (
					<p>Error: {error}</p>
		  		)}
			</div>

	  		<p>Edit <code>src/App.js</code> and save to test HMR</p>
		</div></>
	);
}
