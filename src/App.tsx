import { useState } from 'react';
import axios from 'axios';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [error] = useState(null);
  const [data, set] = useState(null);
  const [id, setId] = useState("1");

  const fetch = async () => {
    try {
      const headers = {     // noch schauen was man braucht für header 
      'Content-Type': 'application/json',
      };
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
        console.log("Fehler, genauere Fehlermeldung noch nicht vorhanden, schaue in die Konsole des Browsers");
    } // Fehlermedlung noch ausbauen !!!!!!!
  };

    fetch();

  return (
    <div>
      <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </a>
      <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
      <h1>Vite + React Gruppe 4 beste Gruppe</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
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
        <p>
          Edit <code>src/App.js</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
