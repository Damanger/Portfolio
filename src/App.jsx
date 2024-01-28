import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route, Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import Inicio from './componentes/inicio';
import ARM from './componentes/ARM'
import Assistant from './componentes/WebAssistant';
import Error404 from './componentes/Error404';
import Raffle from './componentes/rifa';
import Typing from './componentes/Typing'
import Clock from './componentes/Clock';
import Cargando from './componentes/Cargando';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 2000);
  return (
    <Router>
      {isLoading ? (
        <Cargando imagen="Ardilla.webp" />
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
          <Clock/>
          <Routes>
            <Route path='/' element={<Inicio/>} />
            <Route path='/ARM' element={<ARM/>} />
            <Route path='/Assistant' element={<Assistant/>} />
            <Route path='/raffle' element={<Raffle/>} />
            <Route path='/typing' element={<Typing/>} />
            <Route path="*" element={<><Error404/><Navigate to="/not-found" replace /></>}/>
          </Routes>
        </div>
      )}
    </Router>
  );
}

export default App;
