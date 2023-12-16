import { Button } from 'react-bootstrap';
import './Home.css';

export function Home(){
    return(
        <div className="infos">
            <h1>Willkommen zu unserem Buch Webserver</h1>
            <p>Erhalte einen umfassenden Überblick über alle Bücher und verwalte deine Buchsammlung.</p>
            <Button type="submit" className="suchen-btn">Bücher suchen</Button>
        </div>
    );
}

