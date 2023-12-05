import { useState } from 'react';
import axios from 'axios';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [error] = useState(null);
  const [data, set] = useState(null);

  const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwic3ViIjoxLCJ0eXBlIjoiYWNjZXNzIiwianRpIjoiNmJlN2EwNGItZTBjYi00YmU3LThlOGYtNzhhNzFiZGYxODQ0IiwiaWF0IjoxNzAxNzIxNjY3LCJleHAiOjE3MDE3MjUyNjcsImlzcyI6Imh0dHBzOi8vaGthLmRlL0p1ZXJnZW5aaW1tZXJtYW5uIn0.nlKVQSQgaxX5UiP-7OBlyV4aDitC_ZY43-8WmFBWO_wITtumN9w9H5NvCtjQvCgA0TX_gpiOZhV5a2Jw_7sS7y5Xbb_pJiT662Z_uWBVJCIOv1rg0NQn-wsdrmAmgpKB9sz72bOhKKmvrBgEZW_h63Jc0DhlNn4ciK87UO_9rxKobLJIdB3pLDqzeTEEiwInLY7oj5RnzPUIPB-RfNtNvijXUZ7qK2gQrxmirejW29KYZzigon11e-BN587h202DSgwPaTL8YejsMaV_R6hRweDPm8c-bVQpg36aUhtEihurZtgVU7YIFQi2rqXVJi9YMtw3WvzDJBCR49cu9C8TAQ';
  const fetch = async () => {
    try {
      const headers = {     // noch schauen was man braucht für header 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      };
      const axiosInstance = axios.create({
        baseURL: 'https://localhost:3000/graphql',
      });

      axiosInstance.defaults.headers.common = headers;
  
      const response = await axiosInstance.post('baseURL/query', {
        query: `
        query ($id: ID! = "1") {
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
