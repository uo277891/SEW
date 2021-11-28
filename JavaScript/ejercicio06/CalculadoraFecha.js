
        //Version 1.1 23/10/2021 
        "use strict";
        class CalculadoraFecha {
            pila = new Array();
            pilaUsuario = new Array();
            numero = new Text();
            constructor (){ 
                this.numero = "";
            }
            
            meterValor(valor){
                this.numero += valor;
                document.getElementById("elementosPila").value += valor;
            }

            enter(){
                if(this.numero.length > 0){
                    var año = new Date();
                    año.setFullYear(this.numero);
                    this.pila.push(año);
                    this.pilaUsuario.push(this.numero);
                    this.pintarPila();
                    this.numero = "";
                }
            }

            calculoDiaDomingoResurreccion(año){
                var a = año % 19;
                var b = año % 4;
                var c = año % 7;
                var k = parseInt(año/100);
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
            calculoMesDomingoResurreccion(año){
                var a = año % 19;
                var b = año % 4;
                var c = año % 7;
                var k = parseInt(año/100);
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
                var año = fechaAntigua.getFullYear();
                this.pilaUsuario.pop();
                var dia = this.calculoDiaDomingoResurreccion(año);
                var mes = new String(this.calculoMesDomingoResurreccion(año));
                var fecha;
                if(mes == "Marzo"){
                    fecha = new Date(año, 2, dia);
                    this.pila.push(fecha);
                    this.pilaUsuario.push(fecha.toDateString());
                }
                else if(mes == "Abril"){
                    fecha = new Date(año, 3 ,dia);
                    this.pila.push(fecha);
                    this.pilaUsuario.push(fecha.toDateString());
                }
                this.pintarPila();
            }

            domingoFechaResurreccion(año){
                var dia = this.calculoDiaDomingoResurreccion(año);
                var mes = new String(this.calculoMesDomingoResurreccion(año));
                var fecha;
                if(mes == "Marzo"){
                    fecha = new Date(año, 2, dia);
                    return fecha;
                }
                else if(mes == "Abril"){
                    fecha = new Date(año, 3 ,dia);
                    return fecha;
                }
            }

            martesDeCarnaval(){
                var fechaAntigua = this.pila.pop();
                this.pilaUsuario.pop();
                var año = this.domingoFechaResurreccion(fechaAntigua.getFullYear());
                var fechaMartesCarnaval = new Date(año);
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
                var año = this.domingoFechaResurreccion(fechaAntigua.getFullYear());
                var fechaJuevesAscension = new Date(año);
                fechaJuevesAscension.setDate(fechaJuevesAscension.getDate() + 39);
                this.pila.push(fechaJuevesAscension);
                this.pilaUsuario.push(fechaJuevesAscension.toDateString());
                
                this.pintarPila();
            }

            pentecostes(){
                var fechaAntigua = this.pila.pop();
                this.pilaUsuario.pop();
                var año = this.domingoFechaResurreccion(fechaAntigua.getFullYear());
                var fechapentecostes = new Date(año);
                fechapentecostes.setDate(fechapentecostes.getDate() + 49);
                this.pila.push(fechapentecostes);
                this.pilaUsuario.push(fechapentecostes.toDateString());
                
                this.pintarPila();
            }

            fechapentecostes(año){
                var fechapentecostes = this.domingoFechaResurreccion(año);
                fechapentecostes.setDate(fechapentecostes.getDate() + 49);
                return fechapentecostes;
            }

            martesDeCampo(){
                var fechaAntigua = this.pila.pop();
                this.pilaUsuario.pop();
                var año = this.fechapentecostes(fechaAntigua.getFullYear());
                var fechaMartesCampo = new Date(año);
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