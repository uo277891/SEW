"use strict";
class Ejercicio14{
  constructor (){
    navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.mostrarError.bind(this));
  }
  getPosicion(posicion){
    this.mensaje = "Desde estas coordenadas se han realizado el estudio ICM:"
    this.longitud         = posicion.coords.longitude; 
    this.latitud          = posicion.coords.latitude;  
    this.precision        = posicion.coords.accuracy;     
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
    this.longitud = "No hay datos para la longitud"
    this.latitud = "No hay datos para la latitud"
    this.precision = "No hay datos para la precisión"
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
     
  // Version 1.1 23/10/2021  
  ejecutaApp(files) 
  {
      $("aside").empty();
      var archivo = files[0];
      $("aside").append("<ul><li> Información sobre el archivo seleccionado</li>");
      $("aside").append("<li>Nombre del archivo: " + archivo.name + "</li>");
      $("aside").append("<li>Tipo del archivo: " + archivo.type + "(para poder parsearlo debe ser un .txt)</li></ul>");
      $("aside").append("<label for = 'datosSubidos'>Contenido del archivo subido:</label>");
      var txt = "text/plain";
      if (archivo.type == txt)
        {
          var stringDatos = "";
            var lector = new FileReader();
            lector.onload = function (evento) {
            $("aside").append("<textarea id = 'datosSubidos' name='tx'  cols='30' rows='20' disabled>" + this.result +"</textarea>");
            var contenido = this.result.split('\n');
            document.getElementById("datos").value = "";
            for(var i = 0; i < contenido.length; i++){
              var linea = contenido[i];
              var nombre = linea.split(';')[0];
              var altura = parseInt(linea.split(';')[1]);
              var alturaMetros = new Number(0);
              while(altura >= 100){
                alturaMetros++;
                altura -= 100;
              }
              alturaMetros += (altura / 100);
              var peso = parseFloat(linea.split(';')[2]);
              var imc = peso / Math.pow(alturaMetros, 2);
              stringDatos = "\nNombre de la persona: " + nombre + "\n";
              stringDatos += "Altura: " + alturaMetros + " m\n";
              stringDatos += "Peso: " + peso + " kg\n";
              stringDatos += "Índice de masa corporal (IMC): " + Math.round(imc * 100) / 100 + "\n";
              if(imc <= 18.5)
                stringDatos += "Resultado del test: Delgadez extrema";
              else if(imc <= 24.9)
                stringDatos += "Resultado del test: Peso normal";
              else if(imc <= 29.9)
                stringDatos += "Resultado del test: Sobrepeso";
              else if(imc <= 34.9)
                stringDatos += "Resultado del test: Obesidad";
              else
                stringDatos += "Resultado del test: Obesidad extrema";
              stringDatos += "\n";
              document.getElementById("datos").value += stringDatos;
            }
          }      
          lector.readAsText(archivo);
        }
        
        var datos = '';
        datos += '<h2>' + this.mensaje + '</h2>'; 
        datos+='<p>Longitud: '+this.longitud +' grados</p>'; 
        datos+='<p>Latitud: '+this.latitud +' grados</p>';
        datos+='<p>Precisión de la latitud y longitud: '+ this.precision +' metros</p>';
        $("section").append(datos);
  }

  videoPantallaCompleta(){
    document.getElementById("video").requestFullscreen();
  }
  
}

var obj = new Ejercicio14();