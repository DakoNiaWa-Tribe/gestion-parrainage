import './App.css';
import '../styles/FirstPage.css'
import FirstPage from './FirstPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import  Statistiques from './Statistiques';


function App() {
  return (
    <Router>
        <Routes>
              <Route path='/' element ={< FirstPage />} />
              <Route path='/Statistiques' element ={< Statistiques />} />
        </Routes>  

    </Router>       
  );
}

export default App;
