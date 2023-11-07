import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route, Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import Cargando from './componentes/Cargando';
import Inicio from './componentes/inicio';
import Error404 from './componentes/Error404';
import Raffle from './componentes/rifa';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 2000);
  return (
    <Router>
      {isLoading ? (
        <Cargando imagen="ardilla.webp" />
      ) : (
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
          <Routes>
            <Route path='/' element={<Inicio/>} />
            <Route path='/raffle' element={<Raffle></Raffle>} />
            <Route path="*" element={<><Error404/><Navigate to="/not-found" replace /></>}/>
          </Routes>
        </div>
      )}
    </Router>
  );
}

export default App;
