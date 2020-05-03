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
        	jugadaJugador(conn, jsonObject);
        	
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
	public void jugadaJugador(WebSocket conn, JsonObject jsonObject) {
		
	}
	
	public void pasarTurno(WebSocket conn, JsonObject jsonObject) {
		String nombre = jsonObject.get("nombre").toString().replace("\"", "");   
    	Jugador j = this.partida.getJugador(nombre, conn);
    	boolean robo = jsonObject.get("robar").getAsBoolean();
    	Gson gson = new Gson();
    	
    	if(robo) {
    		Ficha ficharobada = this.partida.getFicha();
    		j.robarFicha(ficharobada);
    		Set<Ficha> setFicha = new HashSet<Ficha>();
    		setFicha.add(ficharobada);
    		
    		String jsonFicha = gson.toJson(setFicha);
    		
    		
    		int numFichas = j.getMisFichas().size();
    		String nom = j.getNombre();
    		String infoFicha = "{\"type\":\"nuevaFicha\", \"jugador\":\""+nom+"\", \"ficha\": "+ jsonFicha + ", \"numFichas\":"+ numFichas +"}";
    		String info = "{\"type\":\"robo\", \"jugador\":\""+nom+"\", \"numFichas\":"+ numFichas +"}"; //info de numero de fichas del jugador
    		j.getCliente().send(infoFicha);
    		this.partida.aTodos(info, j.getCliente());
    	}
    	
    	this.partida.siguienteTurno(j.getTurno());
	}
	
}
