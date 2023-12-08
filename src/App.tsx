import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoggedOutNavbar from './components/LoggedOutNavbar/Navbar';
import BuchSuchen from './pages/BuchSuchen';

function App() {

  return (
    <div>
    	<LoggedOutNavbar/>
		<BuchSuchen/>
    </div>
  );
}

export default App;
