var miMapa = new Object();

"use strict";
  class Geolocalizacion{
    constructor(){}

    initMap(){
      miMapa.initMap = initMap;
    }
    
  }

function initMap(){
  var lati = 0;
  var long = 0;
  try{
    lati = parseInt(document.getElementById('Latitud').value);
    long = parseInt(document.getElementById('Longitud').value);
  }catch(err){
    lati = 43.3672702;
    long = -5.8502461;
  }
    var centro = {lat: lati, lng: long};
    var mapaGeoposicionado = new google.maps.Map(document.getElementById('mapa'),{
        zoom: 8,
        center:centro,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    
    infoWindow = new google.maps.InfoWindow;
    if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Aquí está usted');
            mapaGeoposicionado.setCenter(centro);
          }, function() {
            handleLocationError(true, infoWindow, mapaGeoposicionado.getCenter());
          });
        } else {
          handleLocationError(false, infoWindow, mapaGeoposicionado.getCenter());
        }
    }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        //No hace nada.
      }

var miMapa = new Geolocalizacion()