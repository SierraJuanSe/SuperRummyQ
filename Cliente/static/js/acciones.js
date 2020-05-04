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
  var invitado = mes.jugador;
  var text = '';
  if (mes.jugador == nombre) {
    rol = mes.rol;
    numfichas = 14;
    if (mes.rol == 'lider') {
      text = '<h4>¡Hola! Tu eres el lider</h4> <br> Espera mientras se conectan tus invitados <br>' +
        ' Cuando quieras inicar la partida lo puedes hacer <br><br>' +
        '<div id="jugadores"><h5>personas conectadas a tu partida:<br></h5><br></div>' +
        '<button id="iniciar" class="btn waves-effect waves-light" type="submit" name="action" >Iniciar Partida' +
        '<i class="material-icons right">send</i>' +
        '</button>';
      $('#Sala').append(text);
      console.log(document.getElementById('iniciar'));

      $('#iniciar').click(function () {

      });

    } else {
      text = '<h4>¡Hola! Tu eres un invitado </h4> <br> Espera mientras se conectan los otros jugadores <br><br>' +
        '<div class="progress"> <div class="indeterminate"></div> </div>';

      $('#Sala').append(text);
      var jugador = {
        nombre: mes.jugador,
        numfichas: 14,
        rol: mes.rol
      }

      otrosjugadores.push(jugador);

    }

  }

  console.log(invitado);
  $('#jugadores').append(invitado + '<br>');


}

function iniciar(mes) {
  mifichas = mes.fichas;
  turno = mes.setTurno;
  mostrarFichas(mifichas);
}

//funcion para que felipe dibuje las fichas en la maderita
function mostrarFichas(mifichas) {
  var letras = ['a', 'y', 'r', 'n'];
  var ocarta = ['a', 'b']

  var m = '';
  for (let i = 1; i <= 13; i++) {
    m = letras[Math.round(Math.random() * 3)] + i + ocarta[Math.round(Math.random() * 1)];
    console.log(m);
    llevardrop(m);
    // $('#'+m).attr('draggable',false);

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
