"use strict";
class Archivos{
  leerArchivos(files) 
  { 
      var bytesTotales = 0,
          numArchivos = files.length;
      $("section").empty();
      for(var i = 0; i < numArchivos; i++){
        $("section").append("<ul><li>Nombre del archivo: " + files[i].name + "</li>");
        $("section").append("<li>Tamaño del archivo: " + files[i].size + " bytes</li>");
        bytesTotales += files[i].size;
        $("section").append("<li>Tipo del archivo: " + files[i].type + "</li>");
        $("section").append("<li>Fecha de la última modificación: " + files[i].lastModifiedDate + "</li></ul>");
        if(files[i].type == 'text/plain' || files[i].type == 'text/xml' || files[i].type == 'application/json'){
          var lector = new FileReader();
          lector.onload = function (evento) {
            $("section").append("<textarea name='tx'  cols='150' rows='50' disabled>" + this.result +"</textarea>");
          };      
          lector.readAsText(files[i]);
        }
      }
      $("section").append("<p>Número de archivos: " + numArchivos + "</p>"); 
      $("section").append("<p>Peso de los archivos: " + bytesTotales + " bytes</p>"); 
      $("section").append("<p>Contenido de los archivos con formato json, xml o txt: </p>");
  }
}

var obj = new Archivos();