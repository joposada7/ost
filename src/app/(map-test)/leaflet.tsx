'use client';



import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import { Icon } from 'leaflet';

const Leaflet = () => {

    const customIcon = new Icon({
        iconUrl: "../markers.png",
        iconSize: [38,38]
    })

    const mapURL = 1 ===1 ? "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" :
    "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png";

    return (
        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url= {mapURL} 
            />
            <Marker position={[51.505, -0.09]} icon={customIcon}>
                <Popup>
                    Goat Shit
                </Popup>
            </Marker>
        </MapContainer>
    );
};


export default Leaflet;