"use strict";
class CalculadoraBasica {
    pantalla = new Text();
    res = new Number();
    memoria = new Number();
    numero = new Text();
    numero2 = new Text();
    pantallaUsuario = new Text();
    estadoFunciones = new String();

    constructor (){
        this.pantalla = "";
        this.pantallaUsuario = "";
        this.res = 0;
        this.memoria = 0;
        this.numero = "";
        this.estadoFunciones = "trigonometrica";
    }

    funcInversa(){
        this.estadoFunciones = "inversa";
        document.getElementById('sin').value = "asin";
        document.getElementById('cos').value = "acos";
        document.getElementById('tan').value = "atan";
    }

    funcHiperbolica(){
        this.estadoFunciones = "hiperbolica";
        document.getElementById('sin').value = "hsin";
        document.getElementById('cos').value = "hcos";
        document.getElementById('tan').value = "htan";
    }

    funcTrigonometrica(){
        this.estadoFunciones = "trigonometrica";
        document.getElementById('sin').value = "sin";
        document.getElementById('cos').value = "cos";
        document.getElementById('tan').value = "tan";
    }

    pulsarNumero(numero){        
        this.numero += numero;
        //this.pantalla += "new Number(" + this.numero + ")";
        //this.pantallaUsuario += numero;
        document.getElementById('expresion').value = this.pantallaUsuario + "" + this.numero;
    }

    suma(){
        if(this.numero.length > 0){
            var number = eval("new Number(" + this.numero + ")");
            this.pantalla += number;
            this.pantallaUsuario += this.numero;
        }
        this.pantalla += "+";
        this.pantallaUsuario += " + ";
        this.numero = "";
        document.getElementById('expresion').value = this.pantallaUsuario;
    }

    resta(){
        if(this.numero.length > 0){
            var number = eval("new Number(" + this.numero + ")");
            this.pantalla += number + "-";
            this.pantallaUsuario += number + " - ";
            this.numero = "";
        }
        else{
            this.numero = "-";
        }
        document.getElementById('expresion').value = this.pantallaUsuario;
    }

    multiplicacion(){
        if(this.numero.length > 0){
            var number = eval("new Number(" + this.numero + ")");
            this.pantalla += number;
            this.pantallaUsuario += number;
        }
        this.pantalla += "*";
        this.pantallaUsuario += " * ";
        this.numero = "";
        document.getElementById('expresion').value = this.pantallaUsuario;
    }

    division(){
        if(this.numero.length > 0){
            var number = eval("new Number(" + this.numero + ")");
            this.pantalla += number;
            this.pantallaUsuario += number;
        }
        this.pantalla += "/";
        this.pantallaUsuario += " / ";
        this.numero = "";
        document.getElementById('expresion').value = this.pantallaUsuario;
    }

    mPlus(){
        this.memoria += this.res;
    }

    mMenos(){
        this.memoria -= this.res;
    }

    mrc(){
        this.pantalla = this.memoria;
        this.pantallaUsuario = this.memoria;
        document.getElementById('expresion').value = this.pantallaUsuario;
    }

    punto(){
        this.numero += ".";
        this.pantallaUsuario += ".";
        document.getElementById('expresion').value = this.pantallaUsuario;
    }

    c(){
        this.pantalla = "";
        this.pantallaUsuario = "";
        this.numero = "";
        this.res = 0;
        document.getElementById('expresion').value = this.pantallaUsuario;
    }

    igual(){
        try{
            if(this.numero.length > 0){
                var number = eval(this.numero);
                this.pantalla += number;
            }
            var str = this.pantalla;
            this.res = eval(str);
            this.pantallaUsuario = this.res;
            this.pantalla = "";
            this.numero = this.res;
            document.getElementById('expresion').value = this.pantallaUsuario;
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

class CalculadoraCientifica extends CalculadoraBasica{

    constructor(){
        super();
    }

    cuadrado(){
        if(this.numero.length > 0){
            var number = eval(this.numero);
            this.pantalla += "Math.pow(" + number + ",2)";
            this.pantallaUsuario += this.numero + "^2";
            this.numero = "";
            document.getElementById('expresion').value = this.pantallaUsuario;
        }
    }

    elevado(){
        if(this.numero.length > 0){
            var number = eval(this.numero);
            this.pantalla += number + "**";
            this.pantallaUsuario += this.numero + "^";
            this.numero = "";
            document.getElementById('expresion').value = this.pantallaUsuario;
        }
    }

    sin(){
        if(this.numero.length > 0){
            if(this.estadoFunciones == "trigonometrica"){
                this.pantalla += "Math.sin(new Number(" + eval(this.numero) + "))";
                this.pantallaUsuario += "sin(" + this.numero + ")";
            }
            else if(this.estadoFunciones == "inversa"){
                this.pantalla += "Math.asin(new Number(" + eval(this.numero) + "))";
                this.pantallaUsuario += "asin(" + this.numero + ")";
            }
            else{
                this.pantalla += "Math.sinh(new Number(" + eval(this.numero) + "))";
                this.pantallaUsuario += "sinh(" + this.numero + ")";
            }
            this.numero = "";
            document.getElementById('expresion').value = this.pantallaUsuario;
        }
    }

    cos(){
        if(this.numero.length > 0){
            if(this.estadoFunciones == "trigonometrica"){
                this.pantalla += "Math.cos(new Number(" + eval(this.numero) + "))";
                this.pantallaUsuario += "cos(" + this.numero + ")";
            }
            else if(this.estadoFunciones == "inversa"){
                this.pantalla += "Math.acos(new Number(" + eval(this.numero) + "))";
                this.pantallaUsuario += "acos(" + this.numero + ")";
            }
            else{
                this.pantalla += "Math.cosh(new Number(" + eval(this.numero) + "))";
                this.pantallaUsuario += "cosh(" + this.numero + ")";
            }
            this.numero = "";
            document.getElementById('expresion').value = this.pantallaUsuario;
        }
    }

    tan(){
        if(this.numero.length > 0){
            if(this.estadoFunciones == "trigonometrica"){
                this.pantalla += "Math.tan(new Number(" + eval(this.numero) + "))";
                this.pantallaUsuario += "tan(" + this.numero + ")";
            }
            else if(this.estadoFunciones == "inversa"){
                this.pantalla += "Math.atan(new Number(" + eval(this.numero) + "))";
                this.pantallaUsuario += "atan(" + this.numero + ")";
            }
            else{
                this.pantalla += "Math.tanh(new Number(" + eval(this.numero) + "))";
                this.pantallaUsuario += "tanh(" + this.numero + ")";
            }
            this.numero = "";
            document.getElementById('expresion').value = this.pantallaUsuario;
        }
    }

    sqrt(){
        if(this.numero.length > 0){
            this.pantalla += "Math.sqrt(new Number(" + eval(this.numero) + "))";
            this.pantallaUsuario += "sqrt(" + this.numero + ")";
            this.numero = "";
            document.getElementById('expresion').value = this.pantallaUsuario;
        }
    }

    exp10(){
        if(this.numero.length > 0){
            this.pantalla += "Math.pow(10,new Number(" + eval(this.numero) + "))";
            this.pantallaUsuario += "10^" + this.numero;
            this.numero = "";
            document.getElementById('expresion').value = this.pantallaUsuario;
        }
    }

    log(){
        if(this.numero.length > 0){
            this.pantalla += "Math.log10(new Number(" + eval(this.numero) + "))";
            this.pantallaUsuario += "log10(" + this.numero + ")";
            this.numero = "";
            document.getElementById('expresion').value = this.pantallaUsuario;
        }
    }

    exp(){
        if(this.numero.length > 0){
            var number = eval(this.numero);
            this.pantalla += number + "e";
            this.numero = "";
            this.numero2 = "exp";
            this.pantallaUsuario +=  "e";
            document.getElementById('expresion').value = this.pantallaUsuario;
        }
    }

    mod(){
        if(this.numero.length > 0){
            var number = eval(this.numero);
            this.pantalla += number + "%";
            this.pantallaUsuario += "%";
            this.numero = "";
            document.getElementById('expresion').value = this.pantallaUsuario;
            condicion = true;
            //Sin acabar
        }
    }

    abs(){
        if(this.numero.length > 0){
            this.pantalla += "Math.abs(new Number(" + eval(this.numero) + "))";
            this.pantallaUsuario += "|" + this.numero + "|";
            this.numero = "";
            document.getElementById('expresion').value = this.pantallaUsuario;
        }
    }

    pi(){
        //this.pantalla += Math.PI;
        this.pantallaUsuario += "pi";
        this.numero = "" + Math.PI;
        document.getElementById('expresion').value = this.pantallaUsuario;
    }

    fact(){
        if(this.numero.length > 0){
            this.pantallaUsuario += "!";
            var number = eval(this.numero);
            var factorial = 1;
            while (number > 0) {
                factorial *= number; 
                number--;
            }
            this.numero = factorial;
            this.pantalla += "new Number("+ eval(this.numero) + ")";
            this.numero = "";
            document.getElementById('expresion').value = this.pantallaUsuario;
        }
    }

    parentesisAbrir(){
        if(this.numero.length > 0){
            var number = eval(this.numero);
            this.pantalla += number;
            this.pantallaUsuario += number;
        }
        this.pantalla += "(";
        this.pantallaUsuario += "(";
        this.numero = "";
        document.getElementById('expresion').value = this.pantallaUsuario;
    }

    parentesisCerrar(){
        if(this.numero.length > 0){
            var number = eval(this.numero);
            this.pantalla += number;
            this.pantallaUsuario += number;
        }
        this.pantalla += ")";
        this.pantallaUsuario += ")";
        this.numero = "";
        document.getElementById('expresion').value = this.pantallaUsuario;
    }

    ln(){
        if(this.numero.length > 0){
            this.pantalla += "Math.log(new Number(" + eval(this.numero) + "))";
            this.pantallaUsuario += "ln(" + this.numero + ")";
            this.numero = "";
            document.getElementById('expresion').value = this.pantallaUsuario;
        }
    }

    e(){
        this.pantallaUsuario += "e";
        this.numero = "" + Math.E;
        document.getElementById('expresion').value = this.pantallaUsuario;
    }
}
    