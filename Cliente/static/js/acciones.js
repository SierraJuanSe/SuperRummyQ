var nombre = '';
var turno = '';
var rol = '';
var numfichas = 0;
var mifichas = new Array();
var otrosjugadores = new Array();

function login(jugador) {
	nombre = jugador;
  registro = {
    type: 'registro',
    nombre: nombre

  };

  nombrejugador = JSON.stringify(registro);
  websocket.send(nombrejugador);
  //alert(nombrejugador);
}

function registroJugador(mes) {
  if (mes.jugador == nombre) {
    rol = mes.rol;
		numfichas = 14;
    if (mes.rol == 'lider') {
      //motrar boton iniciar

    }else{
			var jugador = {
				nombre : mes.jugador,
				numfichas : 14,
				rol : mes.rol
			}
	    otrosjugadores.push(jugador);

		}
  }

	//mostrar imagen nombre y el numero de cartas
}

function iniciar(mes) {
  mifichas = mes.fichas;
  turno = mes.setTurno;
  mostrarFichas(mifichas);
}

//funcion para que felipe dibuje las fichas en la maderita
function mostrarFichas(mifichas) {
  for (var i = 0; i < mifichas.length; i++) {
		console.log(mifichas[i]);
  }
}

function robo(mes) {

}


function nuevaFicha(mes) {
  nuevaFicha = mes.ficha;
  mostrarFichas(nuevaFicha);
}

function Turno(mes) {
  if (mes.turno == Turno) {
    //habilitar botones para jugar

  } else {
    //deshabilitar botones para juegar
  }
}
