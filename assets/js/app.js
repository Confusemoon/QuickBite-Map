'use strict';

mapboxgl.accessToken = 'pk.eyJ1IjoiZ3VybGlua2F1ciIsImEiOiJjbHExYjM4cHUwNzE3MnBud25qNDlmc2VjIn0.Jeu9BD0h1vILAwXce8dQqw';

const trackBtn = document.getElementById('trackBtn');
const mapContainer = document.getElementById('mapContainer');
let map = null;
let marker = null;

function initMap(lng, lat) {
    if (!map) {
        map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: 15
        });

        marker = new mapboxgl.Marker({ color: '#ff6b35' })
            .setLngLat([lng, lat])
            .addTo(map);
    }
}

function showPosition(position) {
    const { longitude, latitude } = position.coords;
    
    if (!mapContainer.classList.contains('hidden')) return;
    
    mapContainer.classList.remove('hidden');
    initMap(longitude, latitude);
    
    if (marker) {
        marker.setLngLat([longitude, latitude]);
    }
}

function showError(error) {
    let message = 'Error getting location: ';
    switch(error.code) {
        default:
            message += "An unknown error occurred.";
    }
    alert(message);
}

trackBtn.addEventListener('click', () => {
    if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser");
        return;
    }
    
    navigator.geolocation.getCurrentPosition(showPosition, showError, {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000
    });
});