
/**
 * Script principal de la aplicacion
 */

campoCarta();
$('#unir').click(function () {
  $('#menu').hide(500);
  $('#tablero').show(500);
  cartas();
});

$('#robar').click(function () {
// alert($('#espacio41').not(':empty'));
//   if ($('#espacio41').html=="") {
    llevardrop('a9');
  // }else{
  //   alert('Esta ocupado');
  // }
});

function campoCarta() {
  var espacio = 220;
  var top = 450;

  var top = 13;
  var espaciodrop = 0;
  for (var j = 0; j <= 5; j++) {
    for (var i = 0; i <= 9; i++) {
      espacio = espacio + 83;
      espaciodrop = espaciodrop + 1;
      $('#Dropcartas').append('<div id="espacio' + espaciodrop + '" ondrop="drop(event)" ondragover="allowDrop(event)"' +
        ' style="position:fixed;width: 75px;height: 85px;' +
        'padding: 10px;border: 1px solid gray;top:' + top + 'px;left:' + espacio + 'px;"></div>');
    }
    top = top + 110;
    espacio = 220;
  }
}

function cartas() {
  var col = '';
  var nombre = '';
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
      $('#espaciocarta').append('<img id="' + nombre + '" src="static/images/Cartas/' + nombre + '.png" width="95" height="105"' +
        ' draggable="true" ondragstart="drag(event)" style="display: none;">');
    }
  }
  //  $('#r5').attr('draggable',false);
  // $('#y6').show();
  // $('#a6').show();
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
  console.log('data'+data);
  ev.target.appendChild(document.getElementById(data));
   console.log('se ubico en '+ev.target.id);
}


function llevardrop(idCarta) {
   console.log(document.getElementById(idCarta));
     $('#'+idCarta).removeAttr('style');
  $('#espacio41').append(document.getElementById(idCarta));
}

  var top = 13;

  for (var j = 0; j <= 5; j++) {
    for (var i = 0; i <= 9; i++) {
      espacio = espacio + 83;
      $('#Dropcartas').append('<div  ondrop="drop(event)" ondragover="allowDrop(event)"' +
        ' style="position:fixed;width: 75px;height: 85px;' +
        'padding: 10px;border: 1px solid gray;top:' + top + 'px;left:' + espacio + 'px;"></div>');
    }
    top = top + 110;
    espacio = 220;
  }
}


function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}


function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}
e
