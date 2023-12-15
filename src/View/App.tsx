/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-duplicate-disable */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-duplicate-disable */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useState } from 'react';
import './CSS/App.css';
import { fetchId, fetchTitel } from '../Controller/buch-query';

export function App() {
	const [error] = useState(null);
	const [data, set] = useState(null);
	const [id, setId] = useState('');
	const [titel, setTitel] = useState('');

	// eslint-disable-next-line @typescript-eslint/no-floating-promises
	const handleSearchClickId = async () => {
		set(await fetchId(id));
	};
	const handleSearchClickTitel = async () => {
		set(await fetchTitel(titel));
	};

	return (
		<>
			<div>
				<h2>Vite + React Gruppe 4 beste Gruppe</h2>
				<h3> Gib eine Id an für die Suche:</h3>
				<input
					type="number"
					value={id}
					onChange={(ereignis) => setId(ereignis.target.value)}
				/>
				<button onClick={handleSearchClickId}>Suche</button>
				<h3>Gib ein Titel an für die Suche:</h3>
				<input
					type="text"
					value={titel}
					onChange={(event) => setTitel(event.target.value)}
				/>
				<button onClick={handleSearchClickTitel}>Suche</button>
				<div>
					<h2>GraphQL-Daten:</h2>
					{data ? (
						<pre>{JSON.stringify(data, null, 1)}</pre>
					) : (
						<p>Error: {error}</p>
					)}
				</div>
				<img src="https://media1.giphy.com/media/3ohs81rDuEz9ioJzAA/giphy.gif?cid=ecf05e47nf7k4nlpycb33ttrbz4h5w8ev1jj3447p8kyyx8w&ep=v1_gifs_search&rid=giphy.gif&ct=g" />
				<p>
					Edit
					<code>src/App.js</code> and save to test HMR
				</p>
			</div>
		</>
	);

	// https://reactiongifs.me/cdn-cgi/imagedelivery/S36QsAbHn6yI9seDZ7V8aA/873351b1-6da2-40c8-3615-6cb882440a00/w=386
}
