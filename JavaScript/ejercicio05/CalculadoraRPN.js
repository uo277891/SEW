
        //Version 1.1 23/10/2021 
        "use strict";
        class CalculadoraRPN {
            pila = new Array();
            numero = new Text();
            constructor (){ 
                this.numero = "";
            }
            
            meterValor(valor){
                this.numero += valor;
                document.getElementById("elementosPila").value += valor;
            }

            punto(){
                this.numero += ".";
                document.getElementById("elementosPila").value += ".";
            }

            enter(){
                if(this.numero.length > 0){
                    this.pila.push(this.numero);
                    this.pintarPila();
                    this.numero = "";
                }
            }
            operacionBinaria(operacion){
                if(this.pila.length >= 2){
                    var num1 = new Number(this.pila.pop());
                    var num2 = new Number(this.pila.pop());
                    var resultado;
                    if(operacion == "+")
                        resultado = num2 + num1;
                    else if(operacion == "-")
                        resultado = num2 - num1;
                    else if(operacion == "*")
                        resultado = num2 * num1;
                    else if(operacion == "/")
                        resultado = num2 / num1;
                    this.pila.push(resultado);
                    this.pintarPila();
                }
            }

            operacionCientifica(operacion){
                if(this.pila.length >= 1){
                    var num1 = new Number(this.pila.pop());
                    var resultado;
                    if(operacion == "sin"){
                        resultado = Math.sin(num1);
                    }
                    else if(operacion == "cos"){
                        resultado = Math.cos(num1);
                    }
                    else if(operacion == "tan"){
                        resultado = Math.tan(num1);
                    }
                    else if(operacion == "arcsin"){
                        resultado = Math.asin(num1);
                    }
                    else if(operacion == "arccos"){
                        resultado = Math.acos(num1);
                    }
                    else if(operacion == "arctan"){
                        resultado = Math.atan(num1);
                    }
                    else if(operacion == "sqrt"){
                        resultado = Math.sqrt(num1);
                    }
                    this.pila.push(resultado);
                    this.pintarPila();
                }
            }
            reset(){
                this.pila = new Array();
                this.numero = "";
                document.getElementById("elementosPila").value = "";
            }
            pintarPila(){
                document.getElementById("elementosPila").value = "";
                for (var i in this.pila){
                    var num = new Number(i);
                    num++;
                    document.getElementById("elementosPila").value += num + ":         " + this.pila[i] + "\n";
                }
            }
        }