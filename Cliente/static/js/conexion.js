(function(){
var wsUri = "ws://localhost:30001";
var websocket = new WebSocket(wsUri);
var nombrejugador='';

//script conexion
//websocket
//funciones
// onmessage decode mensjae

websocket.onopen = function(evt) { 
    console.log("--Conectado--"); 
};

websocket.onerror = function(evt) {
	console.log("oho!.. error:" + evt.data);
};


websocket.onclose = function (evt) {
	console.log("--Desconectado--" + evt.data); 
	websocket.close();
};

$('#unir').click(function () {
	var nombre = $('#first_name2').val();
	login(nombre);
      alert("Nombre jugador: "+ nombre.toUpperCase(nombre));

});

function login(nombre){

	registro = {
		type : 'registro',
		nombre : nombre

	};

	nombrejugador=JSON.stringify(registro);
	websocket.send(nombrejugador);
	alert(nombrejugador);
  };

websocket.onmessage = function DecodeMensaje(mensaje){
	mes = JSON.parse(mensaje.data);
if(mes.type == 'ping'){
console.log("Pong hecho " +mes.message);
		ping();
	}else if (mes.type == 'registro') {
	registro(mes);
	}else if(mes.type == 'iniciar'){
 		inicar(mes);

}
};

function ping(){
	msm = {
		type : 'ping',
		message: 'Hago Ping'
	};
	var prom=JSON.stringify(msm);
	const sleep = (milliseconds) => {
  		return new Promise(resolve => setTimeout(resolve, milliseconds))
	}

	sleep(10000).then(() => {
		websocket.send(prom);
	});
}

}())

