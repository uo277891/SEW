
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
            mapeoTeclas(){
                document.addEventListener('keydown', (event) => {
                    const valor = event.key;
                    if(valor == '0' || valor == '1' || valor == '2' || valor == '3' || valor == '4' ||
                    valor == '5' || valor == '6' || valor == '7' || valor == '8' || valor == '9'){
                        this.meterValor(valor);
                    }
                    else if(valor == '.' || valor == ',')
                        this.punto();
                    else{
                        if(valor == "+")
                            this.operacionBinaria("+");
                        if(valor == "-")
                        this.operacionBinaria("-");
                        if(valor == "*")
                            this.operacionBinaria("*");
                        if(valor == "/")
                            this.operacionBinaria("/");
                        if(valor == "Enter")
                            this.enter();
                    }
                  });
            }
        }

        "use strict";
        class CalculadoraFecha extends CalculadoraRPN{
            pilaUsuario = new Array();

            meterValor(valor){
                this.numero += valor;
                document.getElementById("elementosPila").value += valor;
            }

            enter(){
                if(this.numero.length > 0){
                    var a??o = new Date();
                    a??o.setFullYear(this.numero);
                    this.pila.push(a??o);
                    this.pilaUsuario.push(a??o.toDateString());
                    this.pintarPila();
                    this.numero = "";
                }
            }

            calculoDiaDomingoResurreccion(a??o){
                var a = a??o % 19;
                var b = a??o % 4;
                var c = a??o % 7;
                var k = parseInt(a??o/100);
                var p = parseInt((13 + 8 * k) / 25);
                var q = parseInt(k / 4);
                var M = (15 - p + k - q) % 30;
                var N = (4 + k - q) % 7;
                var d = (19 * a + M) % 30;
                var e = (2 * b + 4 * c + 6 * d + N) % 7;
                var dia = 0;
                var mes = new String();
                if((d + e) > 9){
                    dia = d + e - 9;
                    mes = "Abril";
                }
                else if((d + e) < 10){
                    dia = d + e + 22;
                    mes = "Marzo";
                }

                if(dia == 26 && mes == "Abril")
                    dia = 19;
                if(dia == 25 && d == 28 && e == 6 && a > 10)
                    dia = 18;
                return dia;
            }
            calculoMesDomingoResurreccion(a??o){
                var a = a??o % 19;
                var b = a??o % 4;
                var c = a??o % 7;
                var k = parseInt(a??o/100);
                var p = parseInt((13 + 8 * k) / 25);
                var q = parseInt(k / 4);
                var M = (15 - p + k - q) % 30;
                var N = (4 + k - q) % 7;
                var d = (19 * a + M) % 30;
                var e = (2 * b + 4 * c + 6 * d + N) % 7;
                var dia = 0;
                var mes = new String();
                if((d + e) > 9){
                    dia = d + e - 9;
                    mes = 'Abril';
                }
                else if((d + e) < 10){
                    dia = d + e + 22;
                    mes = 'Marzo';
                }

                return mes;
            }

            domingoResurreccion(){
                var fechaAntigua = this.pila.pop();
                var a??o = fechaAntigua.getFullYear();
                this.pilaUsuario.pop();
                var dia = this.calculoDiaDomingoResurreccion(a??o);
                var mes = new String(this.calculoMesDomingoResurreccion(a??o));
                var fecha;
                if(mes == "Marzo"){
                    fecha = new Date(a??o, 2, dia);
                    this.pila.push(fecha);
                    this.pilaUsuario.push(fecha.toDateString());
                }
                else if(mes == "Abril"){
                    fecha = new Date(a??o, 3 ,dia);
                    this.pila.push(fecha);
                    this.pilaUsuario.push(fecha.toDateString());
                }
                this.pintarPila();
            }

            domingoFechaResurreccion(a??o){
                var dia = this.calculoDiaDomingoResurreccion(a??o);
                var mes = new String(this.calculoMesDomingoResurreccion(a??o));
                var fecha;
                if(mes == "Marzo"){
                    fecha = new Date(a??o, 2, dia);
                    return fecha;
                }
                else if(mes == "Abril"){
                    fecha = new Date(a??o, 3 ,dia);
                    return fecha;
                }
            }

            martesDeCarnaval(){
                var fechaAntigua = this.pila.pop();
                this.pilaUsuario.pop();
                var a??o = this.domingoFechaResurreccion(fechaAntigua.getFullYear());
                var fechaMartesCarnaval = new Date(a??o);
                var esDomingo = new Number(0);
                var resto = 41;
                while(resto > 0){
                    esDomingo++;
                    fechaMartesCarnaval.setDate(fechaMartesCarnaval.getDate() - 1);
                    if(!(esDomingo == 7)){
                        resto--;
                    }
                    else
                        esDomingo = 0;
                }
                this.pila.push(fechaMartesCarnaval);
                this.pilaUsuario.push(fechaMartesCarnaval.toDateString());
                
                this.pintarPila();
            }

            juevesAscension(){
                var fechaAntigua = this.pila.pop();
                this.pilaUsuario.pop();
                var a??o = this.domingoFechaResurreccion(fechaAntigua.getFullYear());
                var fechaJuevesAscension = new Date(a??o);
                fechaJuevesAscension.setDate(fechaJuevesAscension.getDate() + 39);
                this.pila.push(fechaJuevesAscension);
                this.pilaUsuario.push(fechaJuevesAscension.toDateString());
                
                this.pintarPila();
            }

            pentecostes(){
                var fechaAntigua = this.pila.pop();
                this.pilaUsuario.pop();
                var a??o = this.domingoFechaResurreccion(fechaAntigua.getFullYear());
                var fechapentecostes = new Date(a??o);
                fechapentecostes.setDate(fechapentecostes.getDate() + 49);
                this.pila.push(fechapentecostes);
                this.pilaUsuario.push(fechapentecostes.toDateString());
                
                this.pintarPila();
            }

            fechapentecostes(a??o){
                var fechapentecostes = this.domingoFechaResurreccion(a??o);
                fechapentecostes.setDate(fechapentecostes.getDate() + 49);
                return fechapentecostes;
            }

            sumarDias(){
                if(this.pila.length >= 2){
                    var diasSuma = this.pila.pop();
                    this.pilaUsuario.pop();
                    var fechaSuma = this.pila.pop();
                    this.pilaUsuario.pop();
                    fechaSuma.setDate(fechaSuma.getDate() + diasSuma.getDate());
                    this.pila.push(fechaSuma);
                    this.pilaUsuario.push(fechaSuma.toDateString());
                    this.pintarPila();
                }
            }

            restarDias(){
                if(this.pila.length >= 2){
                    var diasSuma = this.pila.pop();
                    this.pilaUsuario.pop();
                    var fechaSuma = this.pila.pop();
                    this.pilaUsuario.pop();
                    fechaSuma.setDate(fechaSuma.getDate() - diasSuma.getDate());
                    this.pila.push(fechaSuma);
                    this.pilaUsuario.push(fechaSuma.toDateString());
                    this.pintarPila();
                }
            }

            martesDeCampo(){
                var fechaAntigua = this.pila.pop();
                this.pilaUsuario.pop();
                var a??o = this.fechapentecostes(fechaAntigua.getFullYear());
                var fechaMartesCampo = new Date(a??o);
                fechaMartesCampo.setDate(fechaMartesCampo.getDate() + 1);
                while(fechaMartesCampo.getDay() != 2){
                    fechaMartesCampo.setDate(fechaMartesCampo.getDate() + 1);
                }
                this.pila.push(fechaMartesCampo);
                this.pilaUsuario.push(fechaMartesCampo.toDateString());
                
                this.pintarPila();
            }

            reset(){
                this.pila = new Array();
                this.pilaUsuario = new Array();
                this.numero = "";
                document.getElementById("elementosPila").value = "";
            }
            pintarPila(){
                document.getElementById("elementosPila").value = "";
                for (var i in this.pilaUsuario){
                    var num = new Number(i);
                    num++;
                    document.getElementById("elementosPila").value += num + ":         " + this.pilaUsuario[i] + "\n";
                }
            }

            mapeoTeclas(){
                document.addEventListener('keydown', (event) => {
                    const valor = event.key;
                    if(valor == '0' || valor == '1' || valor == '2' || valor == '3' || valor == '4' ||
                    valor == '5' || valor == '6' || valor == '7' || valor == '8' || valor == '9'){
                        this.meterValor(valor);
                    }
                    else{
                        if(valor == "Enter")
                            this.enter();
                    }
                  });
            }
        }

var calculadora = new CalculadoraFecha();
        calculadora.mapeoTeclas();