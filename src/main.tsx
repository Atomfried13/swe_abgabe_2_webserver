import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BuchSuchen } from './pages/BuchSuchen/BuchSuchen.tsx';
import { Home } from './pages/Home/Home.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NeuesBuch } from './pages/NeuesBuch/NeuesBuch';
import { Nav } from './pages/Navigation/Navigation.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Nav />
		<Home />
		<BuchSuchen />
		<NeuesBuch />
	</React.StrictMode>,
);
