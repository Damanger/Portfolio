import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from './placeholder.png';

const Map = () => {
    useEffect(() => {
        const map = L.map('mi_mapa').setView([17.826701, -97.804359], 16);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        const customIcon = L.icon({
            iconUrl: markerIcon, // imagen del marcador
            iconSize: [38, 38], // ancho y alto
            iconAnchor: [20, 40], // posición en x, y 
        });

        L.marker([17.826701, -97.804359], { icon: customIcon }).addTo(map).bindPopup("Universidad Tecnológica de la Mixteca"); // posición inicial del marcador

        map.on('click', onMapClick);

        function onMapClick(e) {
            alert("Posición: " + e.latlng);
        }

        return () => {
            map.remove();
        };
    }, []);

    return (
        <>
            <h1 style={{ display : 'flex', justifyContent : 'center', alignContent : 'center', color : 'aliceblue'}}>Open Street Map implementation</h1>
            <div id="mi_mapa" style={{ width: '100%', height: '500px', border : 'solid 2px #30ff00' }}></div>
        </>
    );
}

export default Map;