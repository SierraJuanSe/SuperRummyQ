var nombre = '';
var turno = '';
var rol = '';
var numfichas = 0;
var robo =true;
var jugada = {
  type : "jugada",
  fichas : []
};


function login(jugador) {
  nombre = jugador;
  registro = {
    type: 'registro',
    nombre: nombre

  };

  nombrejugador = JSON.stringify(registro);
  websocket.send(nombrejugador);

}

function agregarJugada(id, position) {
  ficha = {id: id, espacio: position};
for (let i = 0; i < mifichas.length; i++) {
    if(mifichas[i].id == id){
      ficha.anterior=mifichas[i].espacio;
    }  
}

  jugada.fichas.forEach((item, i) => {
    if(item.id == id){
      jugada.fichas.splice(i, 1);
    }
  });

  jugada.fichas.push(ficha);
  // console.log(jugada.fichas);
}

function nuevajugada(mes){
  dibujarJugada(mes);
  for (let i = 0; i < mes.fichas.length; i++) {
   jugada.fichas.push(mes.fichas[i]);
    
  }
}




function enviarJugada() {
  var mensaje=JSON.stringify(jugada);
 console.log(mensaje);
  websocket.send(mensaje);
}

function dibujarJugada(mes) {
  for (let i = 0; i < mes.fichas.length; i++) {
    $('#'+mes.fichas[i].id ).removeAttr('style');
       $('#'+mes.fichas[i].espacio).append(document.getElementById(mes.fichas[i].id));
      
  }

}

function confirmarJugada(mes){
	if(mes.confirmar == true){
    robo=false;
    for (let i = 0; i < mifichas.length; i++){
      for (let j = 0; j < mes.fichas.length; j++) {
//jugada.fichas.splice(i, 1);
        if(mifichas[i].id == mes.fichas[j].id){
          mifichas.splice(i,1);
        }
        
      }
    
    }
      
	}else{
    //activar div de Alerta...
    
  
    }

}


function registroJugador(mes) {
	console.log(mes);


  var invitado = mes.jugador;
  var text = '';
  if (mes.jugador == nombre) {
    rol = mes.rol;
    numfichas = 14;
    if (mes.rol == 'lider') {
      $('#lider').show();
    } else {
      $('#invitado').show();

    }

  } else {
    var jugador = {
      nombre: mes.jugador,
      numfichas: 14,
      rol: mes.rol
    }

    otrosjugadores.push(jugador);
  }


  $('#jugadores').append(invitado + '<br>');



}

function iniciar(mes) {
  $('#modal2').hide(500);
  mifichas = mes.fichas;
  turno = mes.Turno;
  mostrarFichas(mifichas);
  $('#Usuario').append(nombre);
  $('#nfichasusuario').append(numfichas);
  pintarNombres();
}

function pintarNombres() {
  for (let i = 0; i < otrosjugadores.length; i++) {

    $('#u' + (i + 1)).empty().append(otrosjugadores[i].nombre);
    $('#nf' + (i + 1)).empty().append(otrosjugadores[i].numfichas);
  }
}

function enviarIniciar() {

  inicio = {
    type: 'iniciar'
  }

  mensaje = JSON.stringify(inicio);
  websocket.send(mensaje);
}

//funcion para que felipe dibuje las fichas en la maderita
function mostrarFichas(mifichas) {


  for (let i = 0; i < mifichas.length; i++) {

    mifichas[i].espacio=llevardrop(mifichas[i].id);
    // console.log(mifichas[i].id);
    
    // $('#'+m).attr('draggable',false);

  }

}

function robo(mes) {

  for (let i = 0; i < otrosjugadores.length; i++) {
    if (mes.jugador == otrosjugadores[i].nombre) {

      otrosjugadores[i].numfichas = mes.numFichas;
    }
  }
  pintarNombres();
}


function nuevaFicha(mes) {
  nueva = mes.ficha;
  console.log(mes);
  numfichas = mes.numFichas;
  mostrarFichas(nueva);
  $('#nfichasusuario').empty().append(numfichas);
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

function funTurno(mes) {
  var tipo='';
  if (mes.jugador == nombre) {
    habilitarFichas('hab');
    //habilitar botones para jugar
    console.log('Es mi turno' + mes.jugador);
    $('#pinturno').css('top', '500px');
    $('#pinturno').show();

    $('#jugar').show(1000);
    $('#robar').prop('disabled', false);
    $('#pinturno1').hide();
    $('#pinturno2').hide();
    $('#pinturno3').hide();
  } else {
    habilitarFichas('des');
    //deshabilitar botones para jugar
    $('#pinturno').hide();

    // $('#pinturno').	css('top','14px');
    // $('#pinturno').show();
    for (let i = 0; i < otrosjugadores.length; i++) {

      if (mes.jugador == otrosjugadores[i].nombre) {       
        $('#pinturno'+(i+1)).show();

    }else{
      $('#pinturno'+(i+1)).hide();
    }
  }

     console.log('Es el turrno de ' + mes.jugador);
    $('#robar').prop('disabled', true);
    $('#jugar').hide(1000);

  }

}

function enviarTurno() {
  turno = {
    type: 'pasar',
    nombre: 'nombre',
    robo: robo
  }

  mensaje = JSON.stringify(turno);
  websocket.send(mensaje);

}

function habilitarFichas(tipo) {
  var col = '';
  var nombre = '';
  var ncarta = '';
  for (var j = 1; j <= 4; j++) {
    if (j == 1) {
      col = 'a';
    } else if (j == 2) {
      col = 'r';
    } else if (j == 3) {
      col = 'n';
    } else {
      col = 'y';
    }
    for (var i = 1; i <= 13; i++) {
      nombre = col + i;
      for (let j = 1; j <= 2; j++) {
        if (j == 1) {
          ncarta = 'a'
        } else {
          ncarta = 'b'
        }
         if (tipo=='hab') {
          $('#'+nombre+ncarta).attr('draggable',true);
         }else{
          $('#'+nombre+ncarta).attr('draggable',false);
         }
        

      }
    }
  }
}

