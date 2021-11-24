"use strict";
class Meteo {
    ciudades = new Array();
    apikey = new Text();
    codigoPais = new Text();
    unidades = new Text();
    lang = new Text();
    tipo = new Text();
    constructor(){
        this.apikey = "c23ef78e0bda064e2ba62f9a61a66914";
        this.codigoPais = "ES";
        this.unidades = "&units=metric";
        this.lang = "&lang=es";
        this.tipo = "&mode=xml";
        this.correcto = "¡Todo correcto! JSON recibido de <a href='http://openweathermap.org'>OpenWeatherMap</a>"
        this.ciudades = ["Oviedo", "La Calzada", "Ribadesella", "El Entrego", "La Foz"];
    }
    obtenerDatos(){
        for(var i in this.ciudades){
            this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.ciudades[i] + this.tipo + this.unidades + this.idioma + "&APPID=" + this.apikey;
            $.ajax({
                dataType: "xml",
                url: this.url,
                method: 'GET',
                success: function(datos){
                    //$("h5").text((new XMLSerializer()).serializeToString(datos));
                        //Extracción de los datos contenidos en el XML
                        var ciudad                = $('city',datos).attr("name");
                        var longitud              = $('coord',datos).attr("lon");
                        var latitud               = $('coord',datos).attr("lat");
                        var pais                  = $('country',datos).text();
                        var amanecer              = $('sun',datos).attr("rise");
                        var minutosZonaHoraria    = new Date().getTimezoneOffset();
                        var amanecerMiliSeg1970   = Date.parse(amanecer);
                            amanecerMiliSeg1970  -= minutosZonaHoraria * 60 * 1000;
                        var amanecerLocal         = (new Date(amanecerMiliSeg1970)).toLocaleTimeString("es-ES");
                        var oscurecer             = $('sun',datos).attr("set");          
                        var oscurecerMiliSeg1970  = Date.parse(oscurecer);
                            oscurecerMiliSeg1970  -= minutosZonaHoraria * 60 * 1000;
                        var oscurecerLocal        = (new Date(oscurecerMiliSeg1970)).toLocaleTimeString("es-ES");
                        var temperatura           = $('temperature',datos).attr("value");
                        var temperaturaMin        = $('temperature',datos).attr("min");
                        var temperaturaMax        = $('temperature',datos).attr("max");
                        var temperaturaUnit       = $('temperature',datos).attr("unit");
                        var humedad               = $('humidity',datos).attr("value");
                        var humedadUnit           = $('humidity',datos).attr("unit");
                        var presion               = $('pressure',datos).attr("value");
                        var presionUnit           = $('pressure',datos).attr("unit");
                        var velocidadViento       = $('speed',datos).attr("value");
                        var nombreViento          = $('speed',datos).attr("name");
                        var direccionViento       = $('direction',datos).attr("value");
                        var codigoViento          = $('direction',datos).attr("code");
                        var nombreDireccionViento = $('direction',datos).attr("name");
                        var nubosidad             = $('clouds',datos).attr("value");
                        var nombreNubosidad       = $('clouds',datos).attr("name");
                        var visibilidad           = $('visibility',datos).attr("value");
                        var precipitacionValue    = $('precipitation',datos).attr("value");
                        var precipitacionMode     = $('precipitation',datos).attr("mode");
                        var descripcion           = $('weather',datos).attr("value");
                        var horaMedida            = $('lastupdate',datos).attr("value");
                        var horaMedidaMiliSeg1970 = Date.parse(horaMedida);
                            horaMedidaMiliSeg1970 -= minutosZonaHoraria * 60 * 1000;
                        var horaMedidaLocal       = (new Date(horaMedidaMiliSeg1970)).toLocaleTimeString("es-ES");
                        var fechaMedidaLocal      = (new Date(horaMedidaMiliSeg1970)).toLocaleDateString("es-ES");
                        
                        var stringDatos = "<ul><li>Ciudad: " + ciudad + "</li>";
                            stringDatos += "<li>País: " + pais + "</li>";
                            stringDatos += "<li>Latitud: " + latitud + " grados</li>";
                            stringDatos += "<li>Longitud: " + longitud + " grados</li>";
                            stringDatos += "<li>Temperatura: " + temperatura + " grados Celsius</li>";
                            stringDatos += "<li>Temperatura máxima: " + temperaturaMax + " grados Celsius</li>";
                            stringDatos += "<li>Temperatura mínima: " + temperaturaMin + " grados Celsius</li>";
                            stringDatos += "<li>Presión: " + presion + " milibares</li>";
                            stringDatos += "<li>Humedad: " + humedad + " %</li>";
                            stringDatos += "<li>Amanece a las: " + amanecer + "</li>";
                            stringDatos += "<li>Oscurece a las: " + oscurecer + "</li>";
                            stringDatos += "<li>Dirección del viento: " + direccionViento + " grados</li>";
                            stringDatos += "<li>Velocidad del viento: " + velocidadViento + " metros/segundo</li>";
                            stringDatos += "<li>Hora de la medida: " + horaMedidaLocal + "</li>";
                            stringDatos += "<li>Fecha de la medida: " + fechaMedidaLocal + "</li>";
                            stringDatos += "<li>Descripción: " + descripcion + "</li>";
                            stringDatos += "<li>Visibilidad: " + visibilidad + " metros</li>";
                            stringDatos += "<li>Nubosidad: " + nubosidad + " %</li></ul>";
                        
                        $("section").append(stringDatos);
                    },
                error:function(){
                    $("h3").html("¡Tenemos problemas! No puedo obtener JSON de <a href='http://openweathermap.org'>OpenWeatherMap</a>"); 
                    $("h4").remove();
                    $("pre").remove();
                    $("p").remove();
                    }
            });
        }
        
    }
}