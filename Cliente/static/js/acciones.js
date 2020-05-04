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
	console.log(mes);
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



function turno(turno){  //ENTRA EL DATO TIPO ENTERO TURNO QUE DEBE MANEJAR EL SERVER
	if(jugador.turno==turno){
		//ACTIVE EL BOTON DE PEDIR CARTA Y HABILITE EL BOTON DE JUGAR CARTAS
	}else{
		//MANTENGA LOS BOTONES DESHABILITADOS
	}



function setInfojugador(infoJugador){ //SE MNECESITA QUE INGRESE EL OBJETO JUGADOR QUE LO ENVIARA EL SERVER CUANDO SE CREE O SE UNA ALGUIEN,
	                                  //ARRIBA SE DECLARO LA VARIABLE JUGADOR QUE SERA GLOBAL Y PERTENECERA A CADA CLIENTE
	jugador={
		nombre:infoJugador.nombre,
		puntaje:infoJugador.puntaje,
		numFichas:infoJugador.numFichas,
		turno:infoJugador.turno,
	};
}


function publicarStatusJugador(){  //ESTE METODO SE DEBE EJECUTAR CADA VEZ QUE EL JUGADOR TERMINE SU TURNO
	status={
		infoJugador:jugador,
		type:"status"
	};
	var msm=JSON.stringify(status);
	sendCard(msm);   //ESTE ES EL METODO QUE ENVIA LOS DATOS AL SERVER
}


//------------------------------------------------------------------------------------------------------------



function ingresarJugadores(jugadorRecibido){
	//ENTRA UN OBJETO JUGADOR,Y SE LE ASIGNA A LA ULTIMA POSICION DEL ARRAY JUGADORES
	jugadores.push(jugadorRecibido);
}

