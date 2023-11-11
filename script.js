const map = L.map('map').setView([51.505, -0.09], 13);
        const attribution= '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>';
        const tileUrl = 'https://api.mapbox.com/styles/v1/aroraaran/clot5qbee007c01r60duwcwae/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYXJvcmFhcmFuIiwiYSI6ImNsb3QzdXV3MDA2MjAybG82Y3NlaGZxZTUifQ.L0hJIwM_Lhr2zaQwEcAOpw';
        const tiles = L.tileLayer(tileUrl, { attribution });
        tiles.addTo(map);


let marker, circle, zoomed;
const latitude = 0, longitude = 0, accuracy = 0;

navigator.geolocation.watchPosition(success, error);
function success(position) {

    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const accuracy = position.coords.accuracy;

    if (marker) {
        map.removeLayer(marker);
        map.removeLayer(circle);
    }

        const custom_icon= L.icon({
                    iconUrl: 'images/green-pin.png',
                    iconSize: [29, 29],
                    popupAnchor: [0, -29]
                });

    marker = L.marker([latitude, longitude], {icon: custom_icon}).addTo(map);
    circle = L.circle([latitude, longitude], { radius: accuracy }).addTo(map);


    if (!zoomed) {
        zoomed = map.fitBounds(circle.getBounds()); 
    }

    map.setView([latitude, longitude]);

    L.Routing.control({
    waypoints: [
        L.latLng(latitude, longitude),
        L.latLng(49.2827, -123.116226)
    ],
    routeWhileDragging: true,
    geocoder: L.Control.Geocoder.nominatim()
}).addTo(map);

}
function error(error) {

    if (error.code === 1) {
        alert("Please allow geolocation access");
    } else {
        alert("Cannot get current location");
    }

}

const geocoder = L.Control.geocoder({
  defaultMarkGeocode: false
})
  .on('markgeocode', function(e) {
    var bbox = e.geocode.bbox;
    var poly = L.polygon([
      bbox.getSouthEast(),
      bbox.getNorthEast(),
      bbox.getNorthWest(),
      bbox.getSouthWest()
    ]).addTo(map);
    map.fitBounds(poly.getBounds());
  })
  .addTo(map);

  