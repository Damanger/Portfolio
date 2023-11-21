import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import Inicio from './componentes/inicio';
import Error404 from './componentes/Error404';
import Raffle from './componentes/rifa';
import Clock from './componentes/Clock';

function App() {
  return (
    <Router>
      <div>
        <div className="wrap">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <Clock/>
        <Routes>
          <Route path='/' element={<Inicio/>} />
          <Route path='/raffle' element={<Raffle/>} />
          <Route path="*" element={<><Error404/><Navigate to="/not-found" replace /></>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
