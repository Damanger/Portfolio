import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import Loading from './componentes/Loading'
import Inicio from './componentes/inicio';
import Error404 from './componentes/Error404';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 2000);
  return (
    <Router>
      {isLoading ? (
        <Loading imagen="./Ardilla.png" />
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
            <Route path='*' element={<Error404/>} />
          </Routes>
        </div>
      )}
    </Router>
  );
}

export default App;
