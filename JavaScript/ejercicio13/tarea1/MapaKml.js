var miMapa = new Object();

  function initMap() 
  { 
    var map;
    var src = 'https://uo277891.github.io/SEW/ejercicio13.kml';
    map = new google.maps.Map(document.getElementById('mapa'), {
      center: new google.maps.LatLng(43.3672702, -5.8502461),
      zoom: 2,
      mapTypeId: 'terrain'
    });

    var kmlLayer = new google.maps.KmlLayer(src, {
      suppressInfoWindows: true,
      preserveViewport: false,
      map: map
    });
    kmlLayer.addListener('click', function(event) {
      var content = event.featureData.infoWindowHtml;
      var testimonial = document.getElementById('nombreChincheta');
      testimonial.innerHTML = "Nombre Chincheta: " + content;
    });
  }

miMapa.initMap = initMap;