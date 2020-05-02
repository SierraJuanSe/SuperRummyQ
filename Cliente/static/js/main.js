/**
 * Script principal de la aplicacion
 */
var wsUri = "ws://localhost:30000";
var webSocket = new WebSocket(wsUri);
var name;

$(document).ready(function(){

  $('#btn-unirse').click(function(){
    name = $('#name-input').val();
    unirse(name);
  });

  $('#btn-inicio').click(function(){
    name = $('#name-input').val();
    inicio(name);
  });

  $('#btn-pasar').click(function(){
    name = $('#name-input').val();
    pasar(name);
  });

});

function unirse(name) {
  registro={
		type:'registro',
    nombre: name
	};

	var data=JSON.stringify(registro);
	webSocket.send(data);


}

function inicio(name){
  iniciar={
		type:'iniciar',
    nombre: name
	};

	var data2=JSON.stringify(iniciar);
	webSocket.send(data2);
}

function pasar(name){
  iniciar={
		type:'pasar',
    nombre: name,
    robar: true
	};

	var data2=JSON.stringify(iniciar);
	webSocket.send(data2);
}

webSocket.onopen = function(evt) {
  console.log("Conectado...");
};

webSocket.onmessage = function(evt){
  try{
    console.log(JSON.parse(evt.data));
  }catch (e){
    console.log(evt.data);
  }
};
