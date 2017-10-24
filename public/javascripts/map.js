function initMap() {
              var hcm = {lat: 10.772132, lng: 106.698036};
              map = new google.maps.Map(document.getElementById('map'), {
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
        var latlng = results[0].geometry.location;
        map.setCenter(latlng);
        console.log(latlng);
        $.ajax({ 
                url: "https://api.instagram.com/v1/locations/search?lat=" + latlng.lat() +"&lng=" + latlng.lng() + "&access_token=2366787616.e029fea.b491a9991d9f42e4aaee6522a6e74c23&callback=?",
                dataType: 'jsonp',
                success: function(locations){
                    console.log(locations); 
                    locations.data.forEach(function(location){
                     
                        var p = new google.maps.LatLng(location.latitude, location.longitude);
                        var marker = new google.maps.Marker({                      
                            position: p,
                            title: location.name,
                            map: map
                          }); 
                      
                        marker.addListener('click', function() {
                              getMedia(marker.position);
                         });
                    });
                },
                error: function(locations)
                {
                    alert("asdasdasD");
                }

            })
    } else {
       alert('Geocode was not successful for the following reason: ' + status);
    }
   });
 }

function getMedia(position) {
     var dialog =  $("#dialog");
    dialog.dialog({ 
        autoOpen: false,
         draggable: false,
        resizeable: false,
      
        show: {
          effect: "fade",
          
        },
        hide: {
          effect: "fade",
         
        },
       
     });
  $.ajax({
    url: 'https://api.instagram.com/v1/media/search?lat=' + position.lat() + "&lng=" + position.lng()+ "&access_token=1902770668.3e91549.30b25d9933c541a49e57f60086970f97&callback=?",
    dataType: 'jsonp',
    type: 'GET',
    contentType: 'application/json; charset=utf-8',
    success: function(res) {
      console.log(res)
     
     dialog.empty();
      for(var i = 0; i < res.data.length; i++)
      {
    
        $("#media").append('<img width="100" height="100" src="' + res.data[i].images.thumbnail.url + '">')
      }
    dialog.dialog("open");
      
    },
    error: function(data) {
      console.log(data);
    }
  })
} 