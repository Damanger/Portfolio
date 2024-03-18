import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from './placeholder.png';
import 'leaflet-routing-machine';
import NavBar from './NavBar';

const Map = () => {
    const mapRef = useRef(null); // Utilizamos useRef para mantener una referencia al mapa
    const controlRef = useRef(null); // Utilizamos useRef para mantener una referencia al control de enrutamiento

    useEffect(() => {
        // Obtener la ubicación actual del usuario
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;

            // Verificar si el mapa ya está inicializado
            if (!mapRef.current) {
                // Crear el mapa con la ubicación actual del usuario
                const map = L.map('mi_mapa').setView([latitude, longitude], 16);
                mapRef.current = map; // Asignar el mapa al ref

                // Mapa
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);

                // Ícono personalizado para marcadores
                const customIcon = L.icon({
                    iconUrl: markerIcon,
                    iconSize: [38, 38],
                    iconAnchor: [20, 40]
                });

                // Crear control de enrutamiento
                const control = L.Routing.control({
                    waypoints: [
                        L.latLng(latitude, longitude),
                        L.latLng(latitude + 0.0005, longitude + 0.0005)
                    ],
                    routeWhileDragging: true,
                    createMarker: function(waypointIndex, waypoint, number) {
                        // Crea un marcador personalizado para cada waypoint
                        let title;
                        if (waypointIndex === 0) {
                            title = "You are here";
                        } else if (controlRef.current && waypointIndex === controlRef.current.getWaypoints().length - 1) {
                            title = "Destination";
                        } else {
                            title = `Stop #${waypointIndex}`;
                        }
                        const marker = L.marker(waypoint.latLng, {
                            icon: customIcon,
                            draggable: true
                        });
                        marker.bindPopup(title);
                        return marker;
                    }
                }).addTo(map);
                
                controlRef.current = control; // Asignar el control de enrutamiento al ref
            }
        });
    }, []);

    return (
        <>
            <NavBar/>
            <h1 style={{ display : 'flex', justifyContent : 'center', alignContent : 'center', color : 'aliceblue', marginTop : '1rem', marginBottom : '1rem', fontSize : '3rem'}}>Destination Discovery</h1>
            <div id="mi_mapa" style={{ width: '100%', height: '500px', border : 'solid 2px #30ff00', color : 'black' }}></div>
        </>
    );
}

export default Map;
