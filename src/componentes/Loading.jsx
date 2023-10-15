import React, { useEffect, useState } from 'react';
import '../assets/css/loading.css';

const Loading = ({ imagen }) => {
    const [mostrarLoader, setMostrarLoader] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setMostrarLoader(false);
        }, 2000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className={`loading ${mostrarLoader ? 'visible' : 'oculto'}`}>
            <img src={imagen} alt="Loading..." />
        </div>
    );
};

export default Loading;
