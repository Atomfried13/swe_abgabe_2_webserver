import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import './index.css';
import { BuchSuchen } from './pages/BuchSuchen/BuchSuchen.tsx';
import { Home } from './pages/Home/Home.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Home />
		<App />
		<BuchSuchen />
	</React.StrictMode>,
);
