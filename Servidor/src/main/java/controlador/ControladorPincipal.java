package controlador;

import java.net.InetSocketAddress;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import modelo.Ficha;
import modelo.Jugador;
import modelo.Partida;
import modelo.Tablero;

public class ControladorPincipal extends WebSocketServer{
	//private int port;
	private Partida partida;
	private ArrayList<WebSocket> conectados;
	
	public ControladorPincipal(int port) {
		super(new InetSocketAddress(port));
		this.partida = new Partida(port);
	}

	@Override
	public void onOpen(WebSocket conn, ClientHandshake handshake) {
		if(this.conectados.size()<4) {
			
			System.out.println("Conectado: " + conn.getRemoteSocketAddress());
			this.conectados.add(conn);
		}else {
			
			conn.close();
		}
	}

	@Override
	public void onClose(WebSocket conn, int code, String reason, boolean remote) {
		this.conectados.remove(conn);
		if(this.partida.removeJugador(null, conn) != null) {
			System.out.println("Borrado de los jugadores");
		}
	}

	@Override
	public void onMessage(WebSocket conn, String message) {
		if(this.conectados.contains(conn)) {
			decodemensaje(conn, message);
		}
		
	}

	@Override
	public void onError(WebSocket conn, Exception ex) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void onStart() {
		System.out.println("Server iniciado");
		this.conectados = new ArrayList<WebSocket>();
	}
	
	//Toma el mensaje y lee el type para llamar a la funcion indicada
	public void decodemensaje(WebSocket conn, String mensaje) {
		JsonElement jsonElement = new JsonParser().parse(mensaje);
        JsonObject jsonObject = jsonElement.getAsJsonObject();
        
                
        String type = jsonObject.get("type").toString();
        type = type.replace("\"", "");
        
        if(type.equals("registro")) {
        	registroJugador(conn, jsonObject);
        	
        }else if(type.equals("iniciar")) {
        	this.partida.inicioPartida();
        }else if(type.equals("jugada")) {
        	jugadaJugador(conn, jsonObject, mensaje);
        	
        }else if(type.equals("pasar")){
        	
        	pasarTurno(conn, jsonObject);
        }
        
	}
	
	//metodo para registrar jugadores en la partidad
	public void registroJugador(WebSocket conn, JsonObject jsonObject) {
		String nombre = jsonObject.get("nombre").toString().replace("\"", "");
		Jugador nuevoJ = this.partida.insertJugador(nombre, conn);
		String rol = "invitado";
		String info = "{\"type\":\"registro\", \"jugador\":\""+nombre+"\", \"rol\":\""+rol+"\"}";
    	if(nuevoJ != null) { //el jugador ha sido anadido
    		for (Jugador j : this.partida.getJugadores().values()) {
    			rol = "invitado";
				if(j.getTurno() == 1) {
					rol = "lider";
				}
				info = "{\"type\":\"registro\", \"jugador\":\""+j.getNombre()+"\", \"rol\":\""+rol+"\"}";
				nuevoJ.getCliente().send(info);
			}
    		
    		if(nuevoJ.getTurno() == 1) {
    			rol = "lider";
    		}else {
    			rol = "invitado";
    		}
    		
    		info = "{\"type\":\"registro\", \"jugador\":\""+nuevoJ.getNombre()+"\", \"rol\":\""+rol+"\"}";
    		this.partida.aTodos(info, nuevoJ.getCliente());
    	}
	}
	
	//metodo para validar y confirmar la jugada 
	public void jugadaJugador(WebSocket conn, JsonObject jsonObject, String mensaje) {
		Gson gson =  new Gson();
		int contValidas = 0; //contador para confirmar que todos los movimientos sean validos
		 //conversion de json a un array de fichas con id y espacio
		FichaLLegada[] fichasllegadas = gson.fromJson(jsonObject.get("fichas"), FichaLLegada[].class);
		
		//array con las posibles jugadas
		ArrayList<ArrayList<FichaLLegada>> listJugadas = new ArrayList<ArrayList<FichaLLegada>>();
		ArrayList<FichaLLegada> jugada = new ArrayList<FichaLLegada>();
		
		//separar las fichas que llegan en diferentes jugadas dependiendo el espacio entre ellas
		jugada.add(fichasllegadas[0]);
		for (int i = 0; i < fichasllegadas.length - 1; i++) {
			if(fichasllegadas[i].getEspacio() + 1 == fichasllegadas[i+1].getEspacio()) {
				jugada.add(fichasllegadas[i+1]);
			}else {
				listJugadas.add(jugada);
				jugada = new ArrayList<FichaLLegada>();
				jugada.add(fichasllegadas[i+1]);
			}
		}
		
		if (!listJugadas.contains(jugada)) {
			listJugadas.add(jugada);
		}
		
		System.out.println("jugadas recividas "+listJugadas.size());
		System.out.println(listJugadas.toString());
		//validacion de las n jugadas recividas que se encuentran en el tablero
		ArrayList<String> jugadasActuales =  new ArrayList<String>();
		Jugador j = this.partida.getJugador(null, conn);
		Tablero tablero = this.partida.getTablero();
		for (int i = 0; i < listJugadas.size(); i++) {
			ArrayList<Ficha> fichas = new ArrayList<Ficha>();
			for (FichaLLegada fichaLLegada : listJugadas.get(i)) {
				Ficha f = j.getFicha(fichaLLegada.getId());
				if(f != null) {
					fichas.add(f);
				}else {
					f = tablero.getFicha(fichaLLegada.getId());
					if(f != null) {
						fichas.add(f);
					}
				}
			}
					
			System.out.println(fichas);
			String id = String.valueOf(listJugadas.get(i).get(0).getEspacio());
			if(tablero.insertJugada(id, fichas)) {
				j.hacerJugada(fichas);
				contValidas ++;
				jugadasActuales.add(id);
			}else {
				System.out.println("no funciona :(" + id);
			}
		}
		
		if(contValidas == listJugadas.size()) {
			System.out.println("si funciona " +j.getNumFichas());
			String confirmacion = "{\"type\":\"confirmarJugada\", \"confirmar\":true, \"numfichas\":"+j.getNumFichas()+"\"fichas\":"
					+ jsonObject.get("fichas")+"}";
			conn.send(confirmacion);
			this.partida.aTodos(mensaje, conn);
		}else {
			String confirmacion = "{\"type\":\"confirmarJugada\", \"confirmar\":false, \"fichas\":"
					+ jsonObject.get("fichas")+"}";
			conn.send(confirmacion);
		}
		
		
		//tablero.actualizarJugadas(jugadasActuales);
		System.out.println("jugadas en el tablero " +tablero.getJugadas().toString());
	}
	
	public void pasarTurno(WebSocket conn, JsonObject jsonObject) {
		String nombre = jsonObject.get("nombre").toString().replace("\"", "");   
    	Jugador j = this.partida.getJugador(nombre, conn);
    	boolean robo = jsonObject.get("robo").getAsBoolean();
    	Gson gson = new Gson();
    	
    	if(robo) {
    		String  randomkey = this.partida.getFicha();
    		Ficha f = this.partida.getBolsafichas().remove(randomkey);
    		j.robarFicha(randomkey, f);
    		Set<Ficha> setficha = new HashSet<Ficha>();
    		setficha.add(j.getFicha(randomkey));
    		
    		String jsonFicha = gson.toJson(setficha);
    		
    		int numFichas = j.getNumFichas();
    		String nom = j.getNombre();
    		String infoFicha = "{\"type\":\"nuevaFicha\", \"jugador\":\""+nom+"\", \"ficha\": "+ jsonFicha + ", \"numFichas\":"+ numFichas +"}";
    		String info = "{\"type\":\"robo\", \"jugador\":\""+nom+"\", \"numFichas\":"+ numFichas +"}"; //info de numero de fichas del jugador
    		j.getCliente().send(infoFicha);
    		this.partida.aTodos(info, j.getCliente());
    		
    	}
    	
    	this.partida.siguienteTurno(j.getTurno(), j);
	}
	
}
