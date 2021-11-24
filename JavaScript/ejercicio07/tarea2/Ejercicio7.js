
    "use strict";
    class Operaciones {
        constructor () {   
        }
        mostrarImagen(){
            $("figure").show();
        }
        ocultarImagen(){
            $("figure").hide();
        }
        
        modificar(){
            var parrafo = $("#cambioParrafo").val();
            $("#par1").text(parrafo);
        }
    }