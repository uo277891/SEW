"use strict";
class GeoJson{

  constructor(){}

  initMap() 
  { 
    mapboxgl.accessToken = 'pk.eyJ1IjoidW8yNzc4OTEiLCJhIjoiY2t3ajc5aWpiMTNseDJwcGJ1cmtpdXMwaCJ9.ioB1iFVW2eEMCWPX2Z42XA';
      var archivos = document.getElementById("archivos").files[0]; 
      var reader = new FileReader();
          reader.onload = function (progressEvent) {
              var contenido =  this.result.replaceAll("'", "\"");

              var geojson =JSON.parse(contenido);
              const map = new mapboxgl.Map({
                  container: 'mapa',
                  style: 'mapbox://styles/mapbox/satellite-v9',
                  center: [-5.8502461, 43.3672702],
                  zoom: 8
              });
              for (const feature of geojson.features) {
                  const el = document.createElement('div');
                  el.className = 'marker';
                  new mapboxgl.Marker(el)
                      .setLngLat(feature.geometry.coordinates)
                      .setPopup(
                          new mapboxgl.Popup({ offset: 25 }) // add popups
                              .setHTML(
                                  `<p>${feature.properties.description}</p>`
                              )
                      )
                      .addTo(map);
              }
          };

          reader.readAsText(archivos);
  }
}

var geo = new GeoJson();