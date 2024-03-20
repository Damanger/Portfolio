import React, { useEffect } from 'react';
import '../assets/css/cargando.css';

const Cargando = ({ imagen }) => {
    useEffect(() => {
        const timeout = setTimeout(() => {
            const loader = document.querySelector('.cargando');
            if (loader) {
                loader.classList.add('oculto');
            }
        }, 1500);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="cargando">
            <img src={imagen} alt="Cargando..." />
        </div>
    );
};

export default Cargando;
