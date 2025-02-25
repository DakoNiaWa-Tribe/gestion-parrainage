import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import '../styles/FirstPage.css'
import FirstPage from './FirstPage';
import InfosSupp from './InfosSupp';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <Router>
        <Routes>
              <Route path='/' element ={< FirstPage />} />
              <Route path='/InfosSupp.js' element ={< InfosSupp />} />
        </Routes>  

    </Router>       
  );
}

export default App;
