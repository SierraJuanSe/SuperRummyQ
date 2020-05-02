/**
 * Script principal de la aplicacion
 */

campoCarta();
$('#unir').click(function () {
$('#menu').hide(500);
$('#tablero').show(500);
});

function campoCarta() {
  var espacio = 220;
  var top = 453;

  var top = 13;
  var espaciodrop = 0;
  for (var j = 0; j <= 5; j++) {
    for (var i = 0; i <= 9; i++) {
      espacio = espacio + 83;
      espaciodrop = espaciodrop + 1;
      $('#Dropcartas').append('<div id="espacio'+espaciodrop+'" ondrop="drop(event)" ondragover="allowDrop(event)"' +
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
   // console.log(ev.target.id);
}


function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
  console.log(ev.target.id);
}


