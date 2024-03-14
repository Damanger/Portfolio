import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from './placeholder.png';
import 'leaflet-routing-machine';

const Map = () => {
    useEffect(() => {
        // Crear el mapa
        const map = L.map('mi_mapa').setView([17.826701, -97.804359], 16);

        // Añadir capa de mapa base
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Icono personalizado para marcadores
        const customIcon = L.icon({
            iconUrl: markerIcon,
            iconSize: [38, 38],
            iconAnchor: [20, 40]
        });

        // Añadir marcador con popup
        L.marker([17.826701, -97.804359], { icon: customIcon }).addTo(map).bindPopup("Universidad Tecnológica de la Mixteca");

        // Función para manejar clics en el mapa
        function onMapClick(e) {
            alert("Posición: " + e.latlng);
        }

        // Agregar evento de clic al mapa
        map.on('click', onMapClick);

        // Crear control de enrutamiento
        L.Routing.control({
            waypoints: [
                L.latLng(17.826701, -97.804359),
                L.latLng(17.068682, -96.713113)
            ],
            routeWhileDragging: true,
            createMarker: function(waypointIndex, waypoint, number) {
                // Crea un marcador personalizado para cada waypoint
                return L.marker(waypoint.latLng, {
                    icon: customIcon,
                    draggable: true
                })
            }
        }).addTo(map);

        // Función de limpieza que se ejecuta al desmontar el componente
        return () => {
            map.remove();
        };
    }, []);

    return (
        <>
            <h1 style={{ display : 'flex', justifyContent : 'center', alignContent : 'center', color : 'aliceblue'}}>Open Street Map implementation</h1>
            <div id="mi_mapa" style={{ width: '100%', height: '500px', border : 'solid 2px #30ff00', color : 'black' }}></div>
        </>
    );
}

export default Map;
