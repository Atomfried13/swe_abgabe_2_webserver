// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/react-in-jsx-scope */
import react from 'react';
import reactDOM from 'react-dom/client';
import { App } from './App.tsx';
import './index.css';

reactDOM.createRoot(document.getElementById('root')!).render(
	<react.StrictMode>
		<App/>
	</react.StrictMode>,
);
