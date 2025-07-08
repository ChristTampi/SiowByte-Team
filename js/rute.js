let map;

function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 1.478, lng: 124.845 },
        zoom: 13,
        mapTypeId: 'roadmap' // Ubah di sini ke roadmap, satellite, hybrid, atau terrain
    });
}

document.getElementById('mapType').addEventListener('change', function() {
    const selectedType = this.value;
    map.setMapTypeId(selectedType);
});