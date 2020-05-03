var jugador;
var jugadores[];//ESTA VARIABLE ES UN ARRAYLIST QUE TOMARA LOS VALORES DE UN ARRAY ENTRGADO POR EL SERVER

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

function ingresarJugadores(jugadorRecibido){
	//ENTRA UN OBJETO JUGADOR,Y SE LE ASIGNA A LA ULTIMA POSICION DEL ARRAY JUGADORES
	jugadores.push(jugadorRecibido);
}

function turno(turno){  //ENTRA EL DATO TIPO ENTERO TURNO QUE DEBE MANEJAR EL SERVER
	if(jugador.turno==turno){
		//ACTIVE EL BOTON DE PEDIR CARTA Y HABILITE EL BOTON DE JUGAR CARTAS
	}else{
		//MANTENGA LOS BOTONES DESHABILITADOS
	}
}