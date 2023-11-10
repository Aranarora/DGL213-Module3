const map = L.map('map').setView([51.505, -0.09], 13);
        const attribution= '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>';
        const tileUrl = 'https://api.mapbox.com/styles/v1/aroraaran/clot5qbee007c01r60duwcwae/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYXJvcmFhcmFuIiwiYSI6ImNsb3QzdXV3MDA2MjAybG82Y3NlaGZxZTUifQ.L0hJIwM_Lhr2zaQwEcAOpw';
        const tiles = L.tileLayer(tileUrl, { attribution });
        tiles.addTo(map);


let marker, circle, zoomed;

navigator.geolocation.watchPosition(success, error);
function success(position) {

    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const accuracy = position.coords.accuracy;

    if (marker) {
        map.removeLayer(marker);
        map.removeLayer(circle);
    }

    marker = L.marker([latitude, longitude]).addTo(map);
    circle = L.circle([latitude, longitude], { radius: accuracy }).addTo(map);

    if (!zoomed) {
        zoomed = map.fitBounds(circle.getBounds()); 
    }


}
