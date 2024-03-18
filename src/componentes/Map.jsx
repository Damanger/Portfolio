import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from './placeholder.png';
import yah from './yah.png';
import 'leaflet-routing-machine';
import NavBar from './NavBar';
import '../assets/css/map.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';

const Map = () => {
    const mapRef = useRef(null); // Se utiliza useRef para mantener una referencia al mapa
    const controlRef = useRef(null); // Se utiliza useRef para mantener una referencia al control de enrutamiento
    const [showModal, setShowModal] = useState(false);

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

                // Ícono personalizado para el primer marcador
                const firstMarkerIcon = L.icon({
                    iconUrl: yah,
                    iconSize: [45, 45],
                    iconAnchor: [20, 40]
                });

                // Crear control de enrutamiento
                const control = L.Routing.control({
                    waypoints: [
                        L.latLng(latitude, longitude),
                        L.latLng(latitude + 0.0005, longitude + 0.0005)
                    ],
                    routeWhileDragging: true,
                    createMarker: function(waypointIndex, waypoint) {
                        // Crea un marcador personalizado para cada waypoint
                        let title;
                        let markerIcon = customIcon;
                        if (waypointIndex === 0) {
                            title = "You are here";
                            markerIcon = firstMarkerIcon; // Icono para el primer marcador
                        } else if (controlRef.current && waypointIndex === controlRef.current.getWaypoints().length - 1) {
                            title = "Destination";
                        } else {
                            title = `Stop #${waypointIndex}`;
                        }
                        const marker = L.marker(waypoint.latLng, {
                            icon: markerIcon,
                            draggable: true
                        });
                        marker.bindPopup(title);
                        return marker;
                    }
                }).addTo(map);
                
                controlRef.current = control; // Se asigna el control de enrutamiento al ref

                // Agregar control de geocodificación
                const geocoder = L.Control.geocoder().addTo(map);

                // Listener para el evento markgeocode
                geocoder.on('markgeocode', function(e) {
                    const latlng = e.geocode.center;
                    // Actualizar el segundo waypoint
                    control.setWaypoints([
                        control.getWaypoints()[0].latLng,
                        latlng
                    ]);
                });
            }
        });
    }, []);

    const handleHelpButtonClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <NavBar/>
            <h1 style={{ display : 'flex', justifyContent : 'center', alignContent : 'center', color : 'aliceblue', marginTop : '1rem', marginBottom : '1rem', fontSize : '3rem'}}>Destination Discovery</h1>
            <div id="mi_mapa" style={{ width: '100%', height: '600px', border : 'solid 2px #30ff00', color : 'black', zIndex : '90' }}></div>
            <div className="btn2-box btns">
                <button style={{position : 'absolute', top : '85vh', left : '50%', transform : 'translate(-50%, -50%)'}} className="help-button" onClick={handleHelpButtonClick}>Help</button>
            </div>
            {showModal && (
                <div className="modal-background" onClick={handleCloseModal}>
                    <div className="modal-content" style={{background: 'aliceblue'}}>
                    <h2 style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '20px' }}>Instructions:</h2>
                        <ul style={{ fontSize: '1.5rem', textAlign: 'center', margin: 'auto', width: 'fit-content' }}>
                            <li style={{ marginBottom: '10px' }}>Allow access to your location.</li>
                            <li style={{ marginBottom: '10px' }}>Drag pins named "You are here" and "Destination" wherever you like.</li>
                            <li style={{ marginBottom: '10px' }}>You can search for a destination.</li>
                            <li style={{ marginBottom: '10px' }}>You can add stops along the way by clicking on the red path drawn.</li>
                        </ul>
                    </div>
                </div>
            )}
        </>
    );    
}

export default Map;
