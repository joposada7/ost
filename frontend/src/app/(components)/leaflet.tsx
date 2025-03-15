'use client';



import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import { Icon } from 'leaflet';
import { SatelliteList, SatelliteObj } from '../data/fetchData';
import { useEffect, useState } from 'react';

const Leaflet = () => {

    const customIcon = new Icon({
        iconUrl: "/satellite.png",
        iconSize: [20,20]
    })
    //temp af variable for testing prod env
    const mapURL = false ? "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" :
    "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png";


    const [markers, setMarkers] = useState<Array<SatelliteObj>>([]);
    const [webSocketReady, setWebSocketReady] = useState(false);
    const [webSocket, setWebSocket] = useState(new WebSocket("ws://localhost:8080/ws"));

    useEffect(() => {
        webSocket.onopen = (event) => {
            setWebSocketReady(true);
            console.log("LOGS------WebSocket is open now.");
        };

        webSocket.onmessage = event => {
            const data = JSON.parse(event.data);
            console.log("LOGS------Server message: ", data);
            // data.forEach((satellite: SatelliteObj) => {});
            setMarkers(data);
            // setMarkers(data);
        };

        webSocket.onclose = event => {
            setWebSocketReady(false);
            setTimeout(() => {
                setWebSocket(new WebSocket("ws://localhost:8080/ws"));
            }, 1000);
        };

        webSocket.onerror = err => {
            console.log("LOGS------Socket encountered error: ", err, "Closing socket");
            setWebSocketReady(false);
            webSocket.close();
        };

        return () => {
            webSocket.close();
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