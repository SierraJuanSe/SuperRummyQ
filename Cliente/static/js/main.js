(function(){
var wsUri = "ws://localhost:30001";
var websocket = new WebSocket(wsUri);
var jugador='';


websocket.onopen = function(evt) { 
    console.log("--Conectado--"); 
};


websocket.onerror = e =>{
	console.log(e.data);
};

$('#unir').click(function () {
	login();

});

function login(){

	var nombre = $('#first_name2').val();
	registro(nombre);
    $(location).attr('href',"Tablero.html");
      $('#tablero').show(1000);
      alert("Nombre jugador: "+ nombre.toUpperCase(nombre));
  };

function registro(nombre) {
	registro = {
		type : 'registro',
		nombre : nombre
	};
	jugador=JSON.stringify(registro);
	websocket.send(jugador);
	alert(jugador);
}



function setTurno() {
	
}





 $('#iniciar').click(function jugada(){

	registro = {
		type : 'iniciar',
		nombre : usuario

	};
 }); 



}())