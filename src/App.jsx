import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import Inicio from './componentes/inicio';
import ARM from './componentes/ARM';
import Assistant from './componentes/WebAssistant';
import Error404 from './componentes/Error404';
import Typing from './componentes/Typing';
import Clock from './componentes/Clock';
import Cargando from './componentes/Cargando';
import Binary from './componentes/binary';
import Map from './componentes/Map';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 1000);

  return (
    <Router>
      {isLoading ? (
        <Cargando url="https://raw.githubusercontent.com/Damanger/Portfolio/main/public/Ardilla.webp" />
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
          <Clock />
          <Routes>
            <Route path='/' element={<Inicio />} />
            <Route path='/ARM' element={<ARM />} />
            <Route path='/Assistant' element={<Assistant />} />
            <Route path='/typing' element={<Typing />} />
            <Route path='/binary' element={<Binary />} />
            <Route path='/map' element={(
              <>
                <MapResources />
                <Map />
              </>
            )} />
            <Route path="*" element={<><Error404 /><Navigate to="/not-found" replace /></>} />
          </Routes>
        </div>
      )}
    </Router>
  );
}

// Componente que carga los recursos solo para la ruta /map
const MapResources = () => (
  <>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css" integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI=" crossOrigin="" />
    <script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js" integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM=" crossOrigin=""></script>
  </>
);

export default App;
