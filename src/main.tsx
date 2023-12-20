import React from 'react';
import { AuthProvider } from './Controller/AuthContext.tsx';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BuchSuchen } from './pages/BuchSuchen/BuchSuchen.tsx';
import { Home } from './pages/Home/Home.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NeuesBuch } from './pages/NeuesBuch/NeuesBuch';
import { Nav } from './pages/Navigation/Navigation.tsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login/Login.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<AuthProvider>
		<Router>
			<Nav />
			<Routes>
				<Route path="/" Component={Home}></Route>
				<Route path="/BuchSuchen" Component={BuchSuchen}></Route>
				<Route path="/NeuesBuch" Component={NeuesBuch}></Route>
				<Route path="/Login" Component={Login}></Route>
			</Routes>
		</Router>
		</AuthProvider>
	</React.StrictMode>,
);
