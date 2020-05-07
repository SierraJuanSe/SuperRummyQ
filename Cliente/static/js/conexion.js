var wsUri = "ws://25.133.208.104:30000";
var websocket = new WebSocket(wsUri);
var nombrejugador = '';

//script conexion
//websocket
//funciones
// onmessage decode mensjae

websocket.onopen = function (evt) {
  console.log("--Conectado--");
};

websocket.onerror = function (evt) {
  console.log("oho!.. error:" + evt.data);
};


websocket.onclose = function (evt) {
  console.log("--Desconectado--" + evt.data);
  websocket.close();
};


websocket.onmessage = function DecodeMensaje(mensaje) {
  mes = JSON.parse(mensaje.data);

  if (mes.type == 'ping') {
    console.log("Pong hecho " + mes.message);
    ping();
  } else if (mes.type == 'registro') {
    registroJugador(mes);
  } else if (mes.type == 'iniciar') {
    iniciar(mes);
  } else if (mes.type == 'nuevaFicha') {
    nuevaFicha(mes);
  }else if (mes.type== 'robo') {
    robo(mes);
  }else if (mes.type== 'turno') {
    funTurno(mes);
  }else if(mes.type =='confirmarJugada'){
    confirmarJugada(mes);
  
  }else if(mes.type == 'jugada')     {
    nuevajugada(mes);
  }
}

function ping() {
  msm = {
    type: 'ping',
    message: 'Hago Ping'
  };
  var prom = JSON.stringify(msm);
  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  sleep(10000).then(() => {
    websocket.send(prom);
  });
}
