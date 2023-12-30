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
import { RequireAuth } from './Controller/RequireAuth.tsx';
import { Unauthorized } from './pages/Unauthorized/Unauthorized.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<AuthProvider>
			<Router>
				<Nav />
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route path="/BuchSuchen" element={<BuchSuchen />}></Route>
					<Route
						path="/NeuesBuch"
						element={
							<RequireAuth
								element={<NeuesBuch />}
								allowedRoles={['admin', 'fachabteilung']}
							/>
						}
					/>
					<Route path="/Login" element={<Login />}></Route>
					<Route
						path="/Unauthorized"
						element={<Unauthorized />}
					></Route>
				</Routes>
			</Router>
		</AuthProvider>
	</React.StrictMode>,
);
