
var map,
    markersAll = [];
//clearAllMarkers(); 
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: {lat: -25.363, lng: 131.044}
  });

  renderMarkers();

  map.addListener('click', function(e) {
    var lat = e.latLng.lat();
    var lng = e.latLng.lng();    
    generateMarker(lat, lng);    
    console.log(lat, lng);
  });  
}

let markers = getMarkersFromLocalStorage()
console.log(markers)
function getMarkersFromLocalStorage(){
  return localStorage.markers ? JSON.parse(localStorage.markers) : []
}


function addMarkerToLocalStorage(lat, lng) {
  var add = true;
  // check if this marker exists!
  markers.forEach(function(marker){
    if (marker.lat===lat && marker.lng===lng) add=false;
  })
  // did we find the marker? exit
  if (add===false) return;
  markers.push({lat, lng});
  localStorage.markers = JSON.stringify(markers);
};


function removeMarkerFromLocalStorage(lat, lng) {
  let newMarkers = [];
  markers.forEach(function(marker) {
    if(marker.lat != lat && marker.lng != lng) {
      newMarkers.push({
        lat: marker.lat,
        lng: marker.lng
      });
    }
  });

  localStorage.markers = JSON.stringify(newMarkers);
};

function clearMarkers() {
  markersAll.forEach((marker) => {
    marker.setMap(null);
  });
};

function renderMarkers() {
	markers = getMarkersFromLocalStorage()
	markers.forEach(function(marker) {
    console.log(marker.lat, marker.lng);
    generateMarker(marker.lat, marker.lng);
  });
};


var marker

function generateMarker(lat, lng) {
  marker = new google.maps.Marker({
    position: {lat: lat, lng: lng},
    map: map,

  }); 
    marker.setMap(map);
    markersAll.push(marker);
    addMarkerToLocalStorage(lat, lng);
    // changing icon on click

  marker.addListener('rightclick', function(e) { 
    var lat = e.latLng.lat(); 
    var lng = e.latLng.lng(); 
    //console.log('right click', lat, lng); 
    clearMarkers(); 
    removeMarkerFromLocalStorage(lat, lng); 
    renderMarkers();
  });
  
  marker.addListener('click', changeColor);
  function changeColor(evt) {
    this.setIcon(pinSymbol('blue'));
    document.getElementById('display-lat').innerHTML = lat
    document.getElementById('display-lng').innerHTML = lng
  }
  // on click change color fja
  function pinSymbol(color) {
      return {
          path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z',
          fillColor: color,
          fillOpacity: 1,
          strokeColor: '#000',
          strokeWeight: 2,
          scale: 1
      };
  }

};


// clear all markers
document.getElementById('clear-all-markers').addEventListener('click', clearAllMarkers)
function clearAllMarkers(){
  localStorage.clear()
}
