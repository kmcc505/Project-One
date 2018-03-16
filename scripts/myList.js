var idArry = [];

// Initialize the map.
function initMap() {

    //declaring variables that correspond to the HTML elements
    var ListContainer = document.getElementById("ListContainer");
    var placePhoto2 = document.getElementById("placePhoto2");
    var placeDetails2 = document.getElementById("placeDetails2");

    var getQueryString = function (field, url) {
        var href = url ? url : window.location.href;
        var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
        var string = reg.exec(href);
        return string ? string[1] : null;
    };

    getParams(window.location.href);

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: { lat: 40.72, lng: -73.96 }
    });
    var geocoder = new google.maps.Geocoder;
    var infowindow = new google.maps.InfoWindow;

    geocodePlaceId(geocoder, map, infowindow);

}

// This function is called when the user clicks the UI button requesting
// a geocode of a place ID.
function geocodePlaceId(geocoder, map, infowindow) {
    console.log(idArry);
    var placeId = idArry[2];
    geocoder.geocode({ 'placeId': placeId }, function (results, status) {
        if (status === 'OK') {
            if (results[0]) {
                map.setZoom(11);
                map.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location
                });
                infowindow.setContent(results[0].formatted_address);
                infowindow.open(map, marker);
            } else {
                window.alert('No results found');
            }
        } else {
            window.alert('Geocoder failed due to: ' + status);
        }
    });
}

//extract all id from the page URL
var getParams = function (url) {
    var parser = document.createElement('a');
    parser.href = url;
    var query = parser.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        idArry[pair[0]] = decodeURIComponent(pair[1]);
    }
    return idArry;
};
