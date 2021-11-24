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

        añadirTitulo(){
            var titulo = $("#añadirTitulo").val();
            $("#titulo3").after("<h4>" + titulo + "</h4>");
        }

        contenidoParrafo3(){
            var parrafo = $("#agregarMasContenido").val();
            $("#par3").append(". " + parrafo);
        }

        tituloVerde(){
            $("#titulo2").css('color', 'green');
        }

        eliminarParrafo2(){
            $("h2").remove();
        }

        eliminartabla(){
            $("table").remove();
        }
    }