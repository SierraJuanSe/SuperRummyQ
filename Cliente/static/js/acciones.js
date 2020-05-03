(function(){

var nombre='', 
var turno='', 
var rol='',
var numfichas='', 
var mifichas =  new Array();
var otrosjugadores = new Array();


function registro(mes) {
	if (mes.jugador == nombre) {
		rol=mes.rol;
		nombre=mes.nombre;
		if (mes.rol == 'lider') {
			//motrar boton iniciar
		}else
		var jugador = new object(),
		jugador.nombre =mes.nombre;
		jugador.numfichas=14;
		otrosjugadores.push(jugador);
	}
}

function iniciar(mes) {
	mifichas = mes.fichas;
	turno=mes.setTurno;
	mostrarFichas(mifichas); 

}

function mostrarFichas(mifichas) {
	for(var i=0; i<mifichas.length; i++){

	}
}

function robo(mes) {
	
}


function nuevaFicha(mes) {
	nuevaFicha=mes.ficha;
	mostrarFichas(nuevaFicha);
}

function Turno(mes) {
	if (mes.turno==Turno) {
		//habilitar botones para jugar

	}else{
		//deshabilitar botones para juegar
	}
}











}())