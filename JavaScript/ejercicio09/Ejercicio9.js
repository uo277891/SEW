"use strict";
class Meteo {
    
    constructor(){
        this.apikey = "c23ef78e0bda064e2ba62f9a61a66914";
        this.ciudades = ["Oviedo", "La Calzada", "Ribadesella", "El Entrego", "La Foz"];
        this.tipo = "&mode=xml";
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";
        this.ciudad = "Oviedo"
        this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.ciudad + this.tipo + this.unidades + this.idioma + "&APPID=" + this.apikey;
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
                        var foto = $('weather',datos).attr("icon");
                        var ciudad                = $('city',datos).attr("name");
                        var longitud              = $('coord',datos).attr("lon");
                        var latitud               = $('coord',datos).attr("lat");
                        var pais                  = $('country',datos).text();
                        var amanecer              = $('sun',datos).attr("rise");
                        var minutosZonaHoraria    = new Date().getTimezoneOffset();
                        var amanecerMiliSeg1970   = Date.parse(amanecer);
                            amanecerMiliSeg1970  -= minutosZonaHoraria * 60 * 1000;
                        var oscurecer             = $('sun',datos).attr("set");          
                        var oscurecerMiliSeg1970  = Date.parse(oscurecer);
                            oscurecerMiliSeg1970  -= minutosZonaHoraria * 60 * 1000;
                        var temperatura           = $('temperature',datos).attr("value");
                        var temperaturaMin        = $('temperature',datos).attr("min");
                        var temperaturaMax        = $('temperature',datos).attr("max");
                        var humedad               = $('humidity',datos).attr("value");
                        var presion               = $('pressure',datos).attr("value");
                        var velocidadViento       = $('speed',datos).attr("value");
                        var direccionViento       = $('direction',datos).attr("value");
                        var nubosidad             = $('clouds',datos).attr("value");
                        var visibilidad           = $('visibility',datos).attr("value");
                        var descripcion           = $('weather',datos).attr("value");
                        var horaMedida            = $('lastupdate',datos).attr("value");
                        var horaMedidaMiliSeg1970 = Date.parse(horaMedida);
                            horaMedidaMiliSeg1970 -= minutosZonaHoraria * 60 * 1000;
                        var horaMedidaLocal       = (new Date(horaMedidaMiliSeg1970)).toLocaleTimeString("es-ES");
                        var fechaMedidaLocal      = (new Date(horaMedidaMiliSeg1970)).toLocaleDateString("es-ES");
                        
                        var stringDatos = "<img src='https://openweathermap.org/img/w/" + foto + ".png'/>"
                            stringDatos += "<ul><li>Ciudad: " + ciudad + "</li>";
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

var meteo = new Meteo();