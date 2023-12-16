/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Button } from 'react-bootstrap';
import './Home.css';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LoggedOutNavbar } from '../Navigation/LoggedOutNavbar/Navbar';
import { LoggedInNavbar } from '../Navigation/LoggedInNavbar/Navbar';
import { BuchSuchen } from '../BuchSuchen/BuchSuchen';
import { Login } from '../Login/Login';
import { NeuesBuch } from '../NeuesBuch/NeuesBuch';
import { Einloggen } from '../../Controller/auth.service';

export function Home() {
	return (
		<div>
			<div className="infos">
				<h1>Willkommen zu unserem Buch Webserver</h1>
				<p>
					Erhalte einen umfassenden Überblick über alle Bücher und
					verwalte deine Buchsammlung.
				</p>
				<Button type="submit" className="suchen-btn">
					Bücher suchen
				</Button>
			</div>
		</div>
	);
}
