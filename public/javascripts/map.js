function initMap() {
              var hcm = {lat: 10.772132, lng: 106.698036};
              var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 15,
                center: hcm
              });
              var geocoder = new google.maps.Geocoder();
              document.getElementById('submit').addEventListener('click', function() {
                  geocodeAddress(geocoder, map);
              });
            }
function geocodeAddress(geocoder, map) {
    var address = document.getElementById('address').value;
    geocoder.geocode({'address': address}, function(results, status) {
    if (status === 'OK') {
        map.setCenter(results[0].geometry.location);
    } else {
       alert('Geocode was not successful for the following reason: ' + status);
    }
   });
 }
