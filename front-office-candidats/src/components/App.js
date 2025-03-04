import './App.css';
import '../styles/FirstPage.css'
import FirstPage from './FirstPage';
import InfosSupp from './InfosSupp';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RajoutInfos from './RajoutInfos';
import Enregistrement from './Enregistrement';


function App() {
  return (
    <Router>
        <Routes>
              <Route path='/' element ={< FirstPage />} />
              <Route path='/InfosSupp' element ={< InfosSupp />} />
              <Route path='/RajoutInfos' element = { < RajoutInfos />} />
              <Route path='/Enregistrement' element ={ < Enregistrement />} />
        </Routes>  

    </Router>       
  );
}

export default App;
