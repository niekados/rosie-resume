function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 3,
        center: {
            lat: 46.619261,
            lng: -33.134766
        }
    });

    const locations = [{
            lat: 40.785091,
            lng: -73.968285
        },
        {
            lat: 41.084045,
            lng: -73.874245
        },
        {
            lat: 40.754932,
            lng: -73.948016
        },
    ];

    // Add some markers to the map.
    const markers = locations.map(function (location, i) { // map is JS built-in function, not google map*
        // Create an array of alphabetical characters used to label the markers.
        const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length],
        });
    });

    // Add a marker clusterer to manage the markers.
    const markerCluster = new markerClusterer.MarkerClusterer({
        map,
        markers
    });
}