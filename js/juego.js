var tiempoCorriendo=0;
var botones=true;
var teclas=false;
var a=false;
var juego = {
	pokemon:'',
	filas:[[],[],[]],
	espacioVacio: {
	    fila:2,
	    columna:2
	},
	movimientos:0
	,
	enJuego:false
	,
	tiempo:{
		seg:0,
		dec:0
	},
	iniciar : function(){
		$("#form").slideUp();
		//$("#form")[0].reset();
		desactivarBotones();
		this.enJuego=false;
		pausarCronometro();
		this.movimientos=0;
		this.tiempo.seg=0;
		this.tiempo.dec=0;
		$("#container ul li p.cronometro").html(juego.tiempo.seg+"."+juego.tiempo.dec);
		$("body #container>ul li:last-child p").html("MOV "+this.movimientos);
    	this.instalarPiezas($("#juego"));
    	$("#container .ganaste").slideUp();
    	$("#container .ganaste p").animate({"opacity": "0"}, 500);
  	},
  	mezclarFichas:function(veces){
    	if(veces<=0){return;}
    	var that = this;
    	var funciones = ['moverHaciaAbajo','moverHaciaArriba','moverHaciaIzquierda','moverHaciaDerecha'];
    	var numeroRandom = Math.floor(Math.random() * 4);
    	var nombreDeFuncion = funciones[numeroRandom];
    	this[nombreDeFuncion]();
    	setTimeout(function(){
     		that.mezclarFichas(veces-1);
    	},10);
    	if(veces==1){
     		this.enJuego=true;
     		iniciarCronometro();
     		activarBotones();
     		if(teclas==false){
     			this.capturarTeclas();
     			teclas=true;
     		}
    	}
  	},
  	instalarPiezas:function(juegoEl){
  		juego.eliminarPiezas();
	    var counter = 1;
	    for (var fila = 0; fila < 3; fila++) {
		    for (var columna = 0; columna < 3; columna++) {

			    if(fila == this.espacioVacio.fila && columna == this.espacioVacio.columna) {
			        this.filas[fila][columna] = null;
			    }else{
			        var pieza = this.crearPieza(counter++,fila,columna);
			        juegoEl.append(pieza.elemento);
			        this.filas[fila][columna] = pieza;
			    }
		    }
	    }
	   	this.mezclarFichas(2);
  	},	

  	crearPieza:function(numero,fila, columna){
	    var nuevoElemento = $('<div>');
	    nuevoElemento.addClass('pieza');

	    nuevoElemento.css({
	      	backgroundImage:'url(piezas/'+ this.pokemon +'/'+ numero + '.jpeg)',
	      	top: fila * 150,
	     	 left: columna * 150
	    });

	    return {
	      	elemento:nuevoElemento,
	      	numero:numero,
	     	filaInicial:fila,
	      	columnaInicial:columna,
	    };
	},

	capturarTeclas:function(){  
	    var that = this;
	    $(document).keydown(function(evento) {
	    	if(that.enJuego===true && a==false){
		      	switch(evento.which){
		        case 40:
		        	$("#abajo").animate({'opacity':'1'},200, function() {
		        		$("#abajo").css('opacity','0.2');
 					 });
		          	that.moverHaciaAbajo();
		        break;
		        case 38:
		        	$("#arriba").animate({'opacity':'1'},200, function() {
		        		$("#arriba").css('opacity','0.2');
 					 });
		          	that.moverHaciaArriba();
		        break;
		        case 39:
		        	$("#derecha").animate({'opacity':'1'},200, function() {
		        		$("#derecha").css('opacity','0.2');
 					 });
		          	that.moverHaciaIzquierda();
		        break;
		        case 37:
		       		$("#izquierda").animate({'opacity':'1'},200, function() {
		        		$("#izquierda").css('opacity','0.2');
 					 });
		          	that.moverHaciaDerecha();
		        break;
		        default: return; 
		      	}
		      	that.chequearSiGano();
		      	evento.preventDefault();
		      	a=true;
	      	}
	    });
	    $(document).keyup(function(evento){
	    	a=false;
	    });
  	},

  	moverHaciaAbajo:function(){//--------------------funciones de movimiento
    	var filaOrigen = this.espacioVacio.fila-1;
    	var columnaOrigen = this.espacioVacio.columna;
    	this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
  	},
  	moverHaciaArriba:function(){
    	var filaOrigen = this.espacioVacio.fila+1;
    	var columnaOrigen = this.espacioVacio.columna;
    	this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
  	},
  	moverHaciaDerecha:function(){
    	var filaOrigen = this.espacioVacio.fila;
    	var columnaOrigen = this.espacioVacio.columna+1;
    	this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
  	},
  	moverHaciaIzquierda:function(){
    	var filaOrigen = this.espacioVacio.fila;
    	var columnaOrigen = this.espacioVacio.columna-1;
    	this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
  	},

  	intercambiarPosicionConEspacioVacio:function(fila, columna){
    	var ficha = this.filas[fila] && this.filas[fila][columna];
    	if(ficha){
      		this.filas[this.espacioVacio.fila][this.espacioVacio.columna] = ficha;
      		this.moverFichaFilaColumna(ficha,this.espacioVacio.fila,this.espacioVacio.columna);
      		this.guardarEspacioVacio(fila,columna);
      		if(this.enJuego===true){
		      	var audio = $(".audioMovimiento").get(0);
		      	audio.currentTime=0;
		      	audio.play();
	   			this.movimientos++;
	   			$("body #container>ul li:last-child p").html("MOV "+this.movimientos);
  			}
   		}
  	},

  	moverFichaFilaColumna:function(ficha,fila,columna){
    	ficha.elemento.css({
      		top: fila * 150,
      		left: columna * 150
    	});
  	},

  	guardarEspacioVacio:function(fila,columna){
    	this.espacioVacio.fila = fila;
    	this.espacioVacio.columna = columna;
    	this.filas[fila][columna] = null;
  	},

  	chequearSiGano:function(){
	    for (var f = 0; f < this.filas.length; f++) {
	      	for (var c = 0; c < this.filas.length; c++) {
	        	var ficha = this.filas[f][c];
	        	if(ficha && !(ficha.filaInicial == f && ficha.columnaInicial == c)){
	          		return false;
	        	}
	      	}
	    }
	    lluvia();
	    var audio = $(".audioVictoria").get(0);
		audio.currentTime=0;
		audio.play();
	    this.enJuego=false;
	    if(this.pokemon==="squirtle")
	    	$("#container #juego .ganaste p").html("Vamo a Calmarno");
	    else
	    	$("#container #juego .ganaste p").html("Ganaste!");
	    $("#container #juego .ganaste").slideDown();
	    $("#container #juego .ganaste p").animate({"opacity": "1"}, 500);
	    pausarCronometro();
	    setTimeout(function(){ formulario(); }, 4000);
 	},

 	eliminarPiezas:function(){//------elimina las piezas y reinicia el espacio vacio
 		$("#container .gota").remove();
		$("#juego div.pieza").remove();
		$("#juego div.play").remove();
		$("#juego>p").remove();
		$("#juego .welcome").remove();
	    this.espacioVacio.fila=2;
	    this.espacioVacio.columna=2;
 	},
};

$(document).ready(function() {
	$(function start(){//-----------------inicio
		volumen = 0.1
		var vol = $("audio").get(0);
		vol.volume = volumen;
		vol = $("audio").get(1);
		vol.volume = volumen;
		vol = $("audio").get(2);
		vol.volume = volumen;
	})
//----------------------------------------Botones----------------
	$(".fire").click(function(){//--------cambia los pokemons y el fondo
		if(botones){
			audioBoton();
			$("body").css("background-color", "#FF6A00");
		  	juego.pokemon='charmander';
		  	juego.iniciar();
		}
	});
	$(".leaf").click(function(){
		if(botones){
			audioBoton();
			$("body").css("background-color", "#73D63A");
		  	juego.pokemon='bulbasaur';
		  	juego.iniciar();
		}
	});
	$(".water").click(function(){
		if(botones){
			audioBoton();
			$("body").css("background-color", "#3AC1D6");
		  	juego.pokemon='squirtle';
		  	juego.iniciar();
	  	}
	});
	$(".restart").click(function(){//--------si se esta en juego reinicia
		if(botones){
			if(juego.pokemon!=="")
				audioBoton();
		  		juego.iniciar();
		}
	});
	$(".play").click(function(){//--------comienza en un pokemon random
		audioBoton();
		var numeroRandom = Math.floor(Math.random() * 3);
    	switch(numeroRandom){
    		case 0:
    			$(".water").click();
    		break;
    		case 1:
    			$(".fire").click();
    		break;
    		case 2:
    			$(".leaf").click();
    		break;
    	}
	});
	$("#arriba").unbind("click").click(function(){
		if(juego.enJuego){
			$("#arriba").animate({'opacity':'1'},200, function() {
			    $("#arriba").css('opacity','0.2');
	 		});
			juego.moverHaciaArriba();
			juego.chequearSiGano();
		}
	});
	$("#derecha").unbind("click").click(function(){
		if(juego.enJuego){
	    	$("#derecha").animate({'opacity':'1'},200, function() {
	    		$("#derecha").css('opacity','0.2');
			});
	      	juego.moverHaciaIzquierda();
      		juego.chequearSiGano();
      	}
	});
	$("#izquierda").unbind("click").click(function(){
		if(juego.enJuego){
			console.log("izqu");
	   		$("#izquierda").animate({'opacity':'1'},200, function() {
	    		$("#izquierda").css('opacity','0.2');
			});
			juego.moverHaciaDerecha();
			juego.chequearSiGano();
		}
	});	          	
	$("#abajo").unbind("click").click(function(){
		if(juego.enJuego){
			$("#abajo").animate({'opacity':'1'},200, function() {
			    $("#abajo").css('opacity','0.2');
	 		});
			juego.moverHaciaAbajo();
			juego.chequearSiGano();
		}
	});
});
//----------------------------------------Cronometrar----------------
function iniciarCronometro(){
	tiempoCorriendo = window.setInterval(function (){cronometrar()}, 100);
	$("#reloj .manecilla").css("animation-play-state","running");
}
function pausarCronometro(){
	window.clearInterval(tiempoCorriendo);
	$("#reloj .manecilla").css("animation-play-state","paused");
}
function cronometrar(){
	juego.tiempo.dec++;
    if(juego.tiempo.dec==10){
    	juego.tiempo.dec=0;
    	juego.tiempo.seg++;
    }
    $("#container ul li p.cronometro").html(juego.tiempo.seg+"."+juego.tiempo.dec);
}
//----------------------------------------Activar/Desactivar botones-----------
function desactivarBotones(){
	botones=false;
	$(".water").animate({"opacity": "0.2"}, 600);
	$(".leaf").animate({"opacity": "0.2"}, 600);
	$(".fire").animate({"opacity": "0.2"}, 600);
	$(".restart").animate({"opacity": "0.2"}, 0);
}
function activarBotones(){
	botones=true;
	$(".water").animate({"opacity": "1"}, 600);
	$(".leaf").animate({"opacity": "1"}, 600);
	$(".fire").animate({"opacity": "1"}, 600);
	$(".restart").animate({"opacity": "1"}, 0);
}
function audioBoton(){
	var audio = $(".audioBoton").get(0);
	audio.currentTime=0;
	audio.play();
}
function lluvia(){
	for(var a=0;a<70;a++){
		var posicionRandom = Math.floor(Math.random() * $( window ).width());
		var duracionRandom = Math.floor(Math.random() * 8)+3;
		$("#container").append("<div class='gota'></div>");
		$("#container .gota:nth-child("+a+")").css({
			"transform":"rotate("+Math.floor(Math.random()*360)+"deg)",
			"left":posicionRandom,
			"animation": "a "+duracionRandom+"s infinite linear",
			"animation-delay":Math.floor(Math.random()*2)+"s"
		});
		switch(juego.pokemon){
			case "charmander":
				$(".gota").css('background-image','url("images/fire.png")');
			break;
			case "bulbasaur":
				$(".gota").css('background-image','url("images/leaf.png")');
			break;
			case "squirtle":
				$(".gota").css('background-image','url("images/water.png")');
			break;
		}
	}
}
function formulario(){
	$('#form input[name="name"]').attr("value","");
	$('#form input[name="mov"]').html(juego.movimientos);
	$('#form input[name="mov"]').attr("value",juego.movimientos);
	$('#form input[name="time"]').html(juego.tiempo.seg);
	$('#form input[name="time"]').attr("value",juego.tiempo.seg);
	$("#form").slideDown();
}