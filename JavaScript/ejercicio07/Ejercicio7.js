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

        eliminarParrafo2(){
            $("#par2").remove();
        }

        eliminartabla(){
            $("table").remove();
        }

        recorrerDocumento(){
            $("*").each(function() {
                var etiquetaPadre = $(this).parent().get(0).tagName;
                $(this).prepend(document.createTextNode( "Etiqueta padre : <"  + etiquetaPadre + "> elemento : <" + $(this).get(0).tagName +"> valor: "));
            })
        }

        sumaTabla(){
            var filas = new Number();
            $("table tr").each(function() {
                filas++;
            });
            var columnas = new Number();
            $("table th").each(function() {
                columnas++;
            });
            var total = filas + columnas;
            $("table").after("Filas: " + filas + ", columnas: " + columnas + ", total: " + total);
        }
    }

var ope = new Operaciones();