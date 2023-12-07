/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-duplicate-disable */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useState } from 'react';
import React from 'react';
import './CSS/App.css';
import { axiosInstance } from '../Controller/getAxiosInstance';

export function App() {
	const [error] = useState(null);
	const [data, set] = useState(null);
	const [id, setId] = useState('');
	const [titel, setTitel] = useState('');

	const fetchId = async () => {
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
	const fetchTitel = async () => {
		try {
	  const response = await axiosInstance.post('baseURL/query', {
				variables: { titel }, //a??
				query: `
		query ($titel: String) {
			buecher(titel: $titel) {
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
	const handleSearchClick_Id = () => {
		fetchId();
	  };
	  const handleSearchClick_Titel = () => {
		fetchTitel();
	  };

	return (
		<><div>
			<h2>Vite + React Gruppe 4 beste Gruppe</h2>
			<h3> Gib eine Id an für die Suche:</h3>
			<input
           		type="number"
           		value={id}
           	 		onChange={(ereignis) => setId(ereignis.target.value)}
			/>
			<button onClick={handleSearchClick_Id}>Suche</button>
			<h3>Gib ein Titel an für die Suche:</h3>
		  <input
			type="text"
			value={titel}
			onChange={(event) => setTitel(event.target.value)}
		  />
		  <button onClick={handleSearchClick_Titel}>Suche</button>
			<div>
		  		<h2>GraphQL-Daten:</h2>
		  		{data ? (
					<pre>{JSON.stringify(data, null, 1)}</pre>
		  		) : (
					<p>Error: {error}</p>
		  		)}
			</div>
			<img src="https://media1.giphy.com/media/3ohs81rDuEz9ioJzAA/giphy.gif?cid=ecf05e47nf7k4nlpycb33ttrbz4h5w8ev1jj3447p8kyyx8w&ep=v1_gifs_search&rid=giphy.gif&ct=g" />

	  		<p>Edit <code>src/App.js</code> and save to test HMR</p>
		</div></>
	);

	// https://reactiongifs.me/cdn-cgi/imagedelivery/S36QsAbHn6yI9seDZ7V8aA/873351b1-6da2-40c8-3615-6cb882440a00/w=386
}
