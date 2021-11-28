"use strict";
class Meteo {
    ciudades = new Array();
    apikey = new Text();
    codigoPais = new Text();
    unidades = new Text();
    idioma = new Text();
    constructor(){
        this.apikey = "c23ef78e0bda064e2ba62f9a61a66914";
        this.codigoPais = "ES";
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";
        this.correcto = "¡Todo correcto! JSON recibido de <a href='http://openweathermap.org'>OpenWeatherMap</a>"
        this.ciudades = ["Oviedo", "La Calzada", "Ribadesella", "El Entrego", "La Foz"];
    }
    obtenerDatos(){
        for(var i in this.ciudades){
            var ciudad = new Text(this.ciudades[i]);
            this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.ciudades[i] + "," + this.codigoPais + this.unidades + this.idioma + "&APPID=" + this.apikey;
            $.ajax({
                dataType: "json",
                url: this.url,
                method: 'GET',
                success: function(datos){
                        $("pre").text(JSON.stringify(datos, null, 2)); //muestra el json en un elemento pre
                    
                        //Presentación de los datos contenidos en JSON
                        var stringDatos = "<img src='https://openweathermap.org/img/w/" + datos.weather[0].icon + ".png'/>"
                            stringDatos += "<ul><li>Ciudad: " + datos.name + "</li>";
                            stringDatos += "<li>País: " + datos.sys.country + "</li>";
                            stringDatos += "<li>Latitud: " + datos.coord.lat + " grados</li>";
                            stringDatos += "<li>Longitud: " + datos.coord.lon + " grados</li>";
                            stringDatos += "<li>Temperatura: " + datos.main.temp + " grados Celsius</li>";
                            stringDatos += "<li>Temperatura máxima: " + datos.main.temp_max + " grados Celsius</li>";
                            stringDatos += "<li>Temperatura mínima: " + datos.main.temp_min + " grados Celsius</li>";
                            stringDatos += "<li>Presión: " + datos.main.pressure + " milibares</li>";
                            stringDatos += "<li>Humedad: " + datos.main.humidity + " %</li>";
                            stringDatos += "<li>Amanece a las: " + new Date(datos.sys.sunrise *1000).toLocaleTimeString() + "</li>";
                            stringDatos += "<li>Oscurece a las: " + new Date(datos.sys.sunset *1000).toLocaleTimeString() + "</li>";
                            stringDatos += "<li>Dirección del viento: " + datos.wind.deg + " grados</li>";
                            stringDatos += "<li>Velocidad del viento: " + datos.wind.speed + " metros/segundo</li>";
                            stringDatos += "<li>Hora de la medida: " + new Date(datos.dt *1000).toLocaleTimeString() + "</li>";
                            stringDatos += "<li>Fecha de la medida: " + new Date(datos.dt *1000).toLocaleDateString() + "</li>";
                            stringDatos += "<li>Descripción: " + datos.weather[0].description + "</li>";
                            stringDatos += "<li>Visibilidad: " + datos.visibility + " metros</li>";
                            stringDatos += "<li>Nubosidad: " + datos.clouds.all + " %</li></ul>";
                        
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