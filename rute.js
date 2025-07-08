function initMap() {
const start = { lat: 1.284081, lng: 103.851461 }; // Raffles Place
const end = { lat: 1.286653, lng: 103.827146 };   // Tiong Bahru Plaza

const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,
    center: start,
});

const directionsService = new google.maps.DirectionsService();
const directionsRenderer = new google.maps.DirectionsRenderer({
    map: map,
});

directionsService.route(
    {
    origin: start,
    destination: end,
    travelMode: google.maps.TravelMode.TRANSIT,
    },
    (response, status) => {
    if (status === "OK") {
        directionsRenderer.setDirections(response);
    } else {
        window.alert("Directions request failed due to " + status);
    }
    }
);
}
