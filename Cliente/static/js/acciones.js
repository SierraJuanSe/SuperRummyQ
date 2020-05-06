var nombre = '';
var turno = '';
var rol = '';
var numfichas = 0;
var mifichas = new Array();
var otrosjugadores = new Array();
var jugada = {
  type: "jugada",
  fichas: []
};


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

function agregarJugada(id, position) {
  ficha = { id: id, espacio: position };
  jugada.fichas.forEach((item, i) => {
    if (item.id == id) {
      jugada.fichas.splice(i, 1);
    }
  });

  jugada.fichas.push(ficha);
  // console.log(jugada.fichas);
}

function enviarJugada() {



  jugada.fichas.sort(function (a, b) {
    if (a.espacio > b.espacio) {
      return 1;
    }
    if (a.espacio < b.espacio) {
      return -1;
    }
    return 0

  });
  var mensaje = JSON.stringify(jugada);
  websocket.send(mensaje);
  jugada.fichas=[];
}

function dibujarJugada(mes) {
  for (let i = 0; i < mes.fichas.length; i++) {
    $('#' + mes.fichas[i].id).removeAttr('style');
    $('#espacio' + mes.fichas[i].espacio).append(document.getElementById(mes.fichas[i].id));

  }

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

    // console.log(mifichas[i].id);
    mifichas[i].espacio = llevardrop(mifichas[i].id);


  }
  console.log(mifichas);

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
  mifichas.push(nueva[0]);
  $('#nfichasusuario').empty().append(numfichas);
}

function funTurno(mes) {
  var tipo = '';
  if (mes.jugador == nombre) {
    habilitarFichas('hab');
    //habilitar botones para jugar
    console.log('Es mi turno' + mes.jugador);
    $('#pinturno').css('top', '500px');
    $('#pinturno').show();
    $('#pasar').show(1000);
    $('#jugar').show(1000);
    // $('#robar').prop('disabled', false);
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
        $('#pinturno' + (i + 1)).show();

      } else {
        $('#pinturno' + (i + 1)).hide();
      }
    }

    console.log('Es el turrno de ' + mes.jugador);
    $('#pasar').hide(1000);
    $('#jugar').hide(1000);

  }

}

function enviarTurno() {
  turno = {
    type: 'pasar',
    nombre: 'nombre',
    robo: true
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
        if (tipo == 'hab') {
          $('#' + nombre + ncarta).attr('draggable', true);
        } else {
          $('#' + nombre + ncarta).attr('draggable', false);
        }


      }
    }
  }
}

