import React, { useState, useEffect } from 'react';
import '../assets/css/cargando.css';

const Cargando = ({ url }) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.onload = () => {
            setImageLoaded(true);
        };
        img.src = url;
    }, [url]);

    return (
        <div className={`cargando ${imageLoaded ? 'loaded' : ''}`}>
            <img src={url} alt="Cargando..." />
        </div>
    );
};

export default Cargando;
