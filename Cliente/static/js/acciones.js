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

    $('#u'+(i+1)).empty().append(otrosjugadores[i].nombre);
    $('#nf'+(i+1)).empty().append(otrosjugadores[i].numfichas);
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

    console.log(mifichas[i].id);
    llevardrop(mifichas[i].id);
    // $('#'+m).attr('draggable',false);

  }
}

function robo(mes) {

for (let i = 0; i < otrosjugadores.length; i++) {
     if (mes.jugador==otrosjugadores[i].nombre) {

       otrosjugadores[i].numfichas=mes.numFichas;
     }
}
pintarNombres();
}


function nuevaFicha(mes) {
  nueva = mes.ficha;
  console.log(mes);
  numfichas=mes.numFichas;
  mostrarFichas(nueva);
  $('#nfichasusuario').empty().append(numfichas);
}

function funTurno(mes) {
  if (mes.jugador == nombre) {
    //habilitar botones para jugar
    console.log('Es mi turno'+mes.jugador);
     $('#jugar').prop('disabled', false);
     $('#robar').prop('disabled', false);
  } else {
    //deshabilitar botones para jugar
    console.log('Es el turrno de '+mes.jugador);
    $('#robar').prop('disabled', true);
    $('#jugar').prop('disabled', true);
  }
}


function enviarTurno() {
  turno = {
    type: 'pasar',
    nombre: 'nombre',
    robo:true
  }

  mensaje = JSON.stringify(turno);
  websocket.send(mensaje);

}
