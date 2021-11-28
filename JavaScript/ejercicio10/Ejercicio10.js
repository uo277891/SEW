"use strict";
class Petroleo {
    apikey = new Text();
    url = new Text();
    constructor(){
        this.apikey = "rzgz4fsi7dd0lr2v39f7ylacszxv7wscuao3ehaf00oa8v71a7t9ltzf14fk";
    }
    obtenerDatos(){
            this.url = 'https://www.commodities-api.com/api/' + "latest" + '?access_key=' + this.apikey,
            $.ajax({
                dataType: "json",
                url: this.url,
                method: 'GET',
                success: function(datos){
                        $("pre").text(JSON.stringify(datos, null, 2)); //muestra el json en un elemento pre
                    
                        var fechaAPI = datos.data.date //Fecha de la información
                        $("section").append("<p>Fecha de los datos " + fechaAPI + "</p>");
                        $("section").append("<p>Un barril tiene aproximadamente 150 litros de petróleo.</p>");
                        $("section").append("<p>El petróleo es crudo.</p>");
                        //Presentación de los datos contenidos en JSON
                        //WTIOIL (petróleo de estados unidos)
                        var precioAPI = datos.data.rates.WTIOIL; //Precio en dólares
                        var precioBarril = 1 / precioAPI //Precio barril en dólares
                        var precioBarrilEUR = precioBarril * 0.88; //Precio barril en euros
                        var litroPetroleo = precioBarril / 150; //Precio litro petróleo crudo en dólares
                        var litroPetroleoEUR = litroPetroleo * 0.88; //Precio litro petróleo crudo en euros
                        $("section").append("<ul><li>Petróleo de Estados Unidos (WTI)</li>");
                        $("section").append("<li>Precio barril en dólares: " + precioBarril + " $</li>");
                        $("section").append("<li>Precio barril en euros: " + precioBarrilEUR + " €</li>");
                        $("section").append("<li>Precio litro en dólares: " + litroPetroleo + " $</li>");
                        $("section").append("<li>Precio litro en euros: " + litroPetroleoEUR + " €</li></ul>");

                        //Brent Crude Oil (petróleo referencia en Europa)
                        precioAPI = datos.data.rates.BRENTOIL; //Precio en dólares
                        precioBarril = 1 / precioAPI //Precio barril en dólares
                        precioBarrilEUR = precioBarril * 0.88; //Precio barril en euros
                        litroPetroleo = precioBarril / 150; //Precio litro petróleo crudo en dólares
                        litroPetroleoEUR = litroPetroleo * 0.88; //Precio litro petróleo crudo en euros
                        $("section").append("<ul><li>Petróleo referencia en Europa (Brent)</li>");
                        $("section").append("<li>Precio barril en dólares: " + precioBarril + " $</li>");
                        $("section").append("<li>Precio barril en euros: " + precioBarrilEUR + " €</li>");
                        $("section").append("<li>Precio litro en dólares: " + litroPetroleo + " $</li>");
                        $("section").append("<li>Precio litro en euros: " + litroPetroleoEUR + " €</li></ul>");
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

var pet = new Petroleo();