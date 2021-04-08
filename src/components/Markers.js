import L from 'leaflet';
import positionUrl from '../images/position.svg';
import compass from '../images/rar.svg';

export const positionMarker = new L.icon({
    iconUrl: positionUrl,
    iconSize: [35, 51],
    iconAnchor: [17, 51],
    popupAnchor: [2, -40]
});

export const gpsDirectionMarker = new L.icon({
    iconUrl: compass,
    iconSize: [20, 20],
});