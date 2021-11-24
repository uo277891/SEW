"use strict";
class Geolocalizacion {
    constructor (){
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.mostrarError.bind(this));
    }
    getPosicion(posicion){
        this.mensaje = "Todo ha ido perfecto, aquí tiene su imagen estática de Google Maps:"
        this.longitud         = posicion.coords.longitude; 
        this.latitud          = posicion.coords.latitude;  
        this.precision        = posicion.coords.accuracy;
        this.altitud          = posicion.coords.altitude;
        this.precisionAltitud = posicion.coords.altitudeAccuracy;
        this.rumbo            = posicion.coords.heading;
        this.velocidad        = posicion.coords.speed;       
    }
    getLongitud(){
        return this.longitud;
    }
    getLatitud(){
        return this.latitud;
    }
    getAltitud(){
        return this.altitud;
    }
    mostrarError(error){
        switch(error.code) {
        case error.POSITION_UNAVAILABLE:
            this.mensaje = "ERROR PRODUCIDO: No se puede obtener la información de la geolocalización."
            break;
        case error.PERMISSION_DENIED:
            this.mensaje = "ERROR PRODUCIDO: Se debe permitir la geolocalización en el navegador."
            break;
        case error.TIMEOUT:
            this.mensaje = "ERROR PRODUCIDO: Se ha agotado el tiempo, no se ha podido llevar a cabo la geolocalización."
            break;
        case error.UNKNOWN_ERROR:
            this.mensaje = "ERROR PRODUCIDO: Se desconoce el origen del error."
            break;
        }
    }
    visualizarDatos(main){
        var ubicacion=document.getElementById(main);
        var datos = '';
        datos += '<h2>' + this.mensaje + '</h2>'; 
        datos+='<p>Longitud: '+this.longitud +' grados</p>'; 
        datos+='<p>Latitud: '+this.latitud +' grados</p>';
        datos+='<p>Precisión de la latitud y longitud: '+ this.precision +' metros</p>';
        datos+='<p>Altitud: '+ this.altitude +' metros</p>';
        datos+='<p>Precisión de la altitud: '+ this.precisionAltitud +' metros</p>'; 
        datos+='<p>Rumbo: '+ this.rumbo +' grados</p>'; 
        datos+='<p>Velocidad: '+ this.velocidad +' metros/segundo</p>';
        ubicacion.innerHTML = datos;
    }

    imagenEstaticaGoogleMaps(main){
        var ubicacion=document.getElementById(main);
        
        var apiKey = "&key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU";
        //URL: obligatoriamente https
        var url = "https://maps.googleapis.com/maps/api/staticmap?";
        //Parámetros
        // centro del mapa (obligatorio si no hay marcadores)
        var centro = "center=" + this.latitud + "," + this.longitud;
        //zoom (obligatorio si no hay marcadores)
        //zoom: 1 (el mundo), 5 (continentes), 10 (ciudad), 15 (calles), 20 (edificios)
        var zoom ="&zoom=15";
        //Tamaño del mapa en pixeles (obligatorio)
        var tamaño= "&size=800x600";
        //Escala (opcional)
        //Formato (opcional): PNG,JPEG,GIF
        //Tipo de mapa (opcional)
        //Idioma (opcional)
        //region (opcional)
        //marcadores (opcional)
        var marcador = "&markers=color:red%7Clabel:S%7C" + this.latitud + "," + this.longitud;
        //rutas. path (opcional)
        //visible (optional)
        //style (opcional)
        var sensor = "&sensor=false"; 
        
        this.imagenMapa = url + centro + zoom + tamaño + marcador + sensor + apiKey;
        var datos = '<h2>' + this.mensaje + '</h2>';
        datos += "<img src='"+this.imagenMapa+"' alt='mapa estático google' />";
        ubicacion.innerHTML = datos;
    }
}