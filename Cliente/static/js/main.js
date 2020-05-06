
/**
 * Script principal de la aplicacion
 */


campoCarta();

$('#unir').click(function () {
  //tomar los datos del jugador y enviarlos al server
  var nombre = $('#nombre').val();
  login(nombre);

  //mostrar / esconder inicio
  $('#menu').hide(500);
  $('#tablero').show(500);
  cartas();


});

$('#pasar').click(function () {
  enviarTurno();
});

$('#iniciar').click(function () {
  enviarIniciar();

});


$('#jugar').click(function () {
  enviarJugada();
  $('#alerta').show(1000);
  $('#alerta').hide(10000);
});


function campoCarta() {

  //Espacios del tablero
  var texto = '';
  var espaciodrop = 99;
  for (var j = 0; j <= 9; j++) {
    texto += '<tr>';

    for (var i = 0; i <= 13; i++) {

      espaciodrop = espaciodrop + 1;

      texto += '<td> <div id="espacio' + espaciodrop + '" ondrop="drop(event)" ondragover="allowDrop(event)"' +
        ' style="border: 1px solid  #2ABB00;width: 65px;height: 75px;"></div>  </td>';


    }
    espaciodrop += 100 - 14;
    texto += '</tr>';

  }


  $('#t1').append(texto);

  //espacios de la gondola
  texto = '';
  espaciodrop = 9999;
  for (var j = 0; j <= 1; j++) {
    texto += '<tr>';
    for (var i = 0; i <= 10; i++) {
      espaciodrop += 1;
      texto += '<td> <div id="espacio' + espaciodrop + '" ondrop="drop(event)" ondragover="allowDrop(event)"' +
        ' style="border: 1px solid gray;width: 65px;height: 75px;"> </div>  </td>';
    }
    top = top + 110;
    espacio = 220;
  }
  $('#t2').append(texto);

}


function cartas() {
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
        $('#espaciocarta').append('<img id="' + nombre + ncarta + '" src="static/images/Cartas/' + nombre + '.png" width="91" height="101"' +
          ' draggable="true" ondragstart="drag(event)" style="display: none;">');
      }
    }
  }




}


function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
  //  console.log('La carta '+ev.target.id);
}


function drop(ev) {
  // ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
  var posicion = parseInt(ev.target.id.substring(7));
  agregarJugada(data, posicion);

}

function llevardrop(idCarta) {
  var cont;
  var b = ($("#a").html());
  for (let i = 10000; i < 10022; i++) {
    cont = i;
    var a = ($("#espacio" + i).html());
    if (a == b) {
      //  console.log('Esta vacio');
      $('#' + idCarta).removeAttr('style');
      $('#espacio' + i).append(document.getElementById(idCarta));
      break;
    } else {
      console.log('no esta vacio');
    }

  }

  return cont;

}
