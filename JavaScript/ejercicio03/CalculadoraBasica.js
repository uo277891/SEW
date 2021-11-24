"use strict";
class CalculadoraBasica {
    pantalla = new Text();
    res = new Number();
    memoria = new Number();

    constructor (){
        this.pantalla = "";
        this.res = 0;
        this.memoria = 0;
    }

    pulsarNumero(numero){
        this.pantalla += "" + numero;
        document.getElementById('expresion').value = this.pantalla;
    }

    suma(){
        this.pantalla += "+";
        document.getElementById('expresion').value = this.pantalla;
    }

    resta(){
        this.pantalla += "-";
        document.getElementById('expresion').value = this.pantalla;
    }

    multiplicacion(){
        this.pantalla += "*";
        document.getElementById('expresion').value = this.pantalla;
    }

    division(){
        this.pantalla += "/";
        document.getElementById('expresion').value = this.pantalla;
    }

    mPlus(){
        this.memoria += this.res;
    }

    mMenos(){
        this.memoria -= this.res;
    }

    mrc(){
        this.pantalla = this.memoria;
        document.getElementById('expresion').value = this.pantalla;
    }

    punto(){
        this.pantalla += ".";
        document.getElementById('expresion').value = this.pantalla;
    }

    c(){
        this.pantalla = "";
        this.res = 0;
        document.getElementById('expresion').value = this.pantalla;
    }

    igual(){
        var str = this.pantalla;
        try{
            this.res = eval(str);
            document.getElementById('expresion').value = this.res;
        }
        catch(err){
            this.res = 0;
            document.getElementById('expresion').value = "Error de sintáxis";
        }
    }

    mapeoTeclas(){
        document.addEventListener('keydown', (event) => {
            const valor = event.key;
            if(valor == '0' || valor == '1' || valor == '2' || valor == '3' || valor == '4' ||
            valor == '5' || valor == '6' || valor == '7' || valor == '8' || valor == '9'){
                this.pulsarNumero(valor);
            }
            else if(valor == '.' || valor == ',')
                this.punto();
            else{
                if(valor == "+")
                    this.suma();
                if(valor == "-")
                    this.resta();
                if(valor == "*")
                    this.multiplicacion;
                if(valor == "/")
                    this.division();
                if(valor == "Enter")
                    this.igual();
            }
          });
    }

}
    