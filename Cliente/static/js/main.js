(function(){
var usuario = '';
var wsUri = "ws://localhost:30001";
var websocket = new WebSocket(wsUri);

$('#unir').click(function () {
	login();

});

function login(){

	usuario = $('#first_name2').val();
	registro(usuario);
    $(location).attr('href',"Tablero.html");
      $('#tablero').show(1000);
      alert("Nombre jugador: "+ usuario.toUpperCase(usuario));
  };

function registro(usuario) {
	registro = {
		type : 'registro',
		nombre : usuario
	};

	
}



 $('#iniciar').click(function jugada(){

	registro = {
		type : 'iniciar',
		nombre : usuario

	};
 }); 



}())