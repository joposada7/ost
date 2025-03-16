'use client';

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import { Icon } from 'leaflet';
import { SatelliteList, SatelliteObj } from '../data/fetchData';
import { useEffect, useState } from 'react';
import { webSocket } from "../../socket";

const Leaflet = () => {

    const customIcon = new Icon({
        iconUrl: "/satellite.png",
        iconSize: [20,20]
    })
    //temp af variable for testing prod env
    const mapURL = false ? "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" :
    "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png";
    
    const [markers, setMarkers] = useState<Array<SatelliteObj>>([]);
    const [webSocketReady, setWebSocketReady] = useState(webSocket.connected);

    useEffect(() => {
        webSocket.on('connect_error', (err) => {
            console.log(`LOGS------WebSocket connect_error due to ${err.message}`);
        });

        webSocket.on('connect', () => {
            setWebSocketReady(true);
            console.log("LOGS------WebSocket is open now.");
        });

        webSocket.on('message', (message) => {
            const data = JSON.parse(message.data);
            console.log("LOGS------Server message: ", data);
            // data.forEach((satellite: SatelliteObj) => {});
            // setMarkers(data);
        });

        webSocket.on('disconnect', () => {
            setWebSocketReady(false);
        });

        webSocket.on('error', (err) => {
            console.log("LOGS------Socket encountered error: ", err.message, "Closing socket");
            setWebSocketReady(false);
            webSocket.disconnect();
        });

        return () => {
            webSocket.disconnect();
        };
    }, [webSocket]);

    console.log(markers[0]?.latitude, markers[0]?.longitude);
    return (
        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url= {mapURL} 
            />
            {markers ? markers.map((marker) => (
                <Marker position={[marker.latitude, marker.longitude]} key={marker.id} icon={customIcon}>
                    <Popup>
                        {marker.name}
                    </Popup>
                </Marker>)
            ): null}
            
        </MapContainer>
    );
};


export default Leaflet;