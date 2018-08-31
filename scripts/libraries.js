/*
================================================================================
//  WHAT THIS FILE DOES:
//  1. GETS DATA WITH AN AJAX CALL FROM AN API
//  2. WHICH LISTS DATA MATCHING USER INPUT
//  2. INITIALIZES A MAP ONTO THE DOM
//  3. SETS MARKERS ONTO MAP USING THE API LOCATION DATA
================================================================================
*/

$(document).ready(function() {
   $.ajax(getWeather);  // an object with keys and values
   initialize(); // MAP
});

// ajax call to chicago open api for libraries
var getWeather = {
   type: 'get',
   url: 'https://data.cityofchicago.org/resource/dip3-ud6z.json',

   success: function(data) {
      console.log('we did it.');
      console.dir(data);
      console.log(data[0].address);
      var community = prompt('Enter your community name to find libraries near you (Austin, Roseland, etc.)');
      community = community.toUpperCase();
      $('.weather').append('<h3>Libraries in ' + community + ':</h3>');
      for (var i = 0; i < data.length; i++) {
         if (community == data[i].community_area) {
            $('.weather').append('<li>' + data[i].address + '</li>');
            setMarker(data[i].latitude, data[i].longitude);
         }
       }
   }, // end success

   error: function() {
      console.log('it didnt work');
   }
}; // end getweather


//////////////////////////////
//  the map code            //
//////////////////////////////

// map is made up of a dom location (canvas)
// and some options (lat+long+zoom+type)
var mapCanvas, mapOptions, map;

function initialize() {
    mapCanvas = document.getElementById('map-canvas');
    mapOptions = {
        center: new google.maps.LatLng(41.931929, -87.698327),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(mapCanvas, mapOptions);
}

// markers have a map to go on, a position and an animation
function setMarker (lat, long) {
    console.log('test');
    console.log(lat, long);
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, long),
        map: map,
        animation: google.maps.Animation.DROP
    });
}
