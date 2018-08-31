
var mapCanvas, mapOptions, map, libs;

$(document).ready(function() {
  initMap();
  $.ajax(getData);
  $("#locateButton").click(function(){
    displayData();
  });
});

function initMap() {
    mapCanvas = document.getElementById('map-canvas');
    mapOptions = {
        center: new google.maps.LatLng(41.800000, -87.698327),
        zoom: 11,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(mapCanvas, mapOptions);
}

var getData = {
   type: 'get',
   url: 'https://data.cityofchicago.org/resource/dip3-ud6z.json',
   success: function(data){
     console.log(data);
     libs = data;
     initLibs(data);
   },
   error: function() { console.log('ajax error'); }
};

function initLibs(data){
  populateDropdown(data);
  setAllMarkers(data);
}

function populateDropdown(libs){
  let uniqueCommunities = ['SHOW ALL'];
  // filter
  $.each(libs, function(index, library){
    if( $.inArray(library.community_area, uniqueCommunities) == -1){
      uniqueCommunities.push(library.community_area);
    }
  });
  // populate
  $.each(uniqueCommunities, function(index, community){
    let option = `<option value='${community}'>${community}</option>`;
    $('.community-dropdown').append(option);
  });
}

function setAllMarkers(data){
  libs.forEach(function(library){
    setMarker(library.latitude, library.longitude);
  });
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

function displayData(){
  let selected = $('#community-select').val();

  $('.results-list').empty();
  initMap();

  if (selected === 'SHOW ALL'){
    setAllMarkers(libs);
  } else {
    for (var i = 0; i < libs.length; i++) {
       if (selected == libs[i].community_area) {

         let listItem = "<div class='list-item'><em>" + libs[i].community_area + "LIBRARY</em><br></div><li>" + libs[i].address + "</li>";
          $('.results-list').append(listItem);

          setMarker(libs[i].latitude, libs[i].longitude);
       }
     }
  }
}
