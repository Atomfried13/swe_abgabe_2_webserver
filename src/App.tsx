/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-duplicate-disable */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useState } from 'react';
import React from 'react';
import axios from 'axios';
import './App.css';

export function App() {
	const [error] = useState(null);
	const [data, set] = useState(null);
	const [id, setId] = useState("1");

	const fetch = async () => {
		try {
			const headers = {     // noch schauen was man braucht für header 
	  'Content-Type': 'application/json',
	  'Accept': '*/*'
	  };
	  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	  const axiosInstance = axios.create({
				baseURL: 'https://localhost:3000/graphql',
	  });

	  axiosInstance.defaults.headers.common = headers;
  
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
            type="text"
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
