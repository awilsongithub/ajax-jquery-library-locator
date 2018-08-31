/*
===============================================================
//  WHAT THIS FILE DOES:
//  1. GETS DATA WITH AN AJAX CALL TO API
//  2. WHICH LISTS DATA MATCHING USER INPUT
//  2. INITIALIZES A MAP ONTO THE DOM
//  3. SETS MARKERS ONTO MAP USING API DATA
===========================================================+====
*/

/*
TODO problem:  prompt blocks page load
current order of execution
get DATA
log data
prompt ..........
append heading
append filtered data
set markers
initialize the map onto page
*/

var mapCanvas, mapOptions, map, searchVariable, libraries;

$(document).ready(function() {
  initMap();

  $.ajax(getDataApendMatches);

  $("#locateButton").click(function(){
    displayData();
  });

});

/* initialize the map with a constructor */
function initMap() {
    mapCanvas = document.getElementById('map-canvas');
    mapOptions = {
        center: new google.maps.LatLng(41.800000, -87.698327),
        zoom: 11,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(mapCanvas, mapOptions);
}

function setMarker (lat, long) {
    console.log('test');
    console.log(lat, long);
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, long),
        map: map,
        animation: google.maps.Animation.DROP
    });
}

function populateDropdown(libraries){
  let uniqueCommunities = ['SHOW ALL'];

  $.each(libraries, function(index, library){
    if( $.inArray(library.community_area, uniqueCommunities) == -1){
      uniqueCommunities.push(library.community_area);
    }
  });

  $.each(uniqueCommunities, function(index, community){
    let option = `<option value='${community}'>${community}</option>`;
    $('.community-dropdown').append(option);
  });
}

function appendMatches(data){
  libraries = data; // make available globally
  console.log(libraries);

  populateDropdown(data);

  if(searchVariable){
    var community = searchVariable.toUpperCase();
    var heading = '<h3>Libraries in ' + community + ':</h3>';
    $('.results-list').append(heading);
  }

  libraries.forEach(function(library){
    setMarker(library.latitude, library.longitude);
  });
}

var getDataApendMatches = {
   type: 'get',
   url: 'https://data.cityofchicago.org/resource/dip3-ud6z.json',
   success: function(data){ appendMatches(data) },
   error: function() { console.log('ajax error'); }
};


function displayData(){
  let selectedCommunity = $('#community-select').val();

  $('.results-list').empty();
  initMap();

  // if selected is all set all markers
  if (selectedCommunity === 'SHOW ALL'){
    $.each(libraries, function(index, library){
      setMarker(library.latitude, library.longitude);
    })
  } else {
    for (var i = 0; i < libraries.length; i++) {
       if (selectedCommunity == libraries[i].community_area) {
          $('.results-list').append('<li>' + libraries[i].address + '</li>');
          setMarker(libraries[i].latitude, libraries[i].longitude);
       }
     }
  }


}
