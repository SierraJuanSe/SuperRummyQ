package modelo;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Random;
import java.util.Set;

import org.java_websocket.WebSocket;

import com.google.gson.Gson;



public class Partida {
	private int idPartida;
	private String stado;
	private Tablero tablero;
	private HashMap<String, Ficha> bolsafichas;
	private HashMap<String, Jugador> jugadores;
	
	public Partida(int idPartida) {
		this.idPartida = idPartida;
		this.tablero = new Tablero();
		this.bolsafichas = new HashMap<String, Ficha>();
		this.jugadores = new HashMap<String, Jugador>();
	}
	
	//Ingresar jugador a la partida
	public boolean insertJugador(String nombre, WebSocket conn){
		
		if(!this.jugadores.containsKey(nombre)) {
			int turno = this.jugadores.size() + 1;
			Jugador j = new Jugador(nombre, turno, conn);
			this.jugadores.put(nombre, j);
			return true;
		}
		
		return false;
	}
	
	//sacar jugador de la partida
	public Jugador removeJugador(String nombre, WebSocket conn) {
		for (Jugador j : this.jugadores.values()) {
			if(j.getNombre().equals(nombre) || j.getCliente().equals(conn)) {
				return this.jugadores.remove(j.getNombre());
			}
		}
		return null;
	}
	
	//retirnar un jugadro por nombre o por conexion
	public Jugador getJugador(String nombre, WebSocket conn) {
		for (Jugador j : this.jugadores.values()) {
			if(j.getNombre().equals(nombre) || j.getCliente().equals(conn)) {
				return j;
			}
		}
		return null;
	}
	
	/*
	 * Acciones para el inicio de la partida
	 */
	public void inicioPartida() {
		llenarBolsa();
		repartirFichas();
		
		for (Jugador j : this.jugadores.values()) {
			Gson gson = new Gson();
			String fichas = gson.toJson(j.getMisFichas());
			j.getCliente().send(fichas);
			String turno = "{\"type\":\"setTurno\", \"Turno\":"+ j.getTurno() +"}";
			j.getCliente().send(turno);
			
			if(j.getTurno() == 1) {
				turno = "{\"type\":\"Turno\", \"jugador\":\""+j.getNombre()+"\", \"Turno\":"+ j.getTurno() +"}";
				j.getCliente().send(turno);
			}
		}
		
	}
	
	/*
	 * Acciones para el paso del turno
	 */
	public void siguienteTurno(int turno) {
		int siguienteT = turno + 1;
		
		if(siguienteT > this.jugadores.size()) {
			siguienteT = 1;
		}
		
		String info = null;
		for (Jugador j : this.jugadores.values()) {
			if(j.getTurno() == siguienteT) {
				info = "{\"type\":\"Turno\", \"jugador\":\""+j.getNombre()+"\", \"Turno\":"+ j.getTurno() +"}";
			}
		}
		
		aTodos(info);
	}
	
	//mensaje a todos los jugadores
	public void aTodos(String info) {
		if(info != null) {
			for (Jugador j : this.jugadores.values()) {
				j.getCliente().send(info);
			}
		}	
	}
	
	//mensaje a todos menos a uno
	public void aTodos(String info, WebSocket conn) {
		if(info != null) {
			for (Jugador j : this.jugadores.values()) {
				if(!j.getCliente().equals(conn)) {
					j.getCliente().send(info);
				}
			}
		}	
	}
	/*
	 * Llenar la bolsa con las 104 fichas
	 */
	public void llenarBolsa() {
		for(int k = 0; k < 2 ; k++) {
			for(int i = 0; i<Ficha.colores.length ; i++) {
				for(int j = 1; j < 14; j++) {
					Ficha f = new Ficha(Ficha.colores[i], j);
					this.bolsafichas.put(String.valueOf(k)+i+j, f);
				}
			}
		}
		
	}
	
	/*
	 *Reparte las 14 fichas inciales de manera aleatoria a los jugadores que hay en la partida 
	 */
	public void repartirFichas() {
		for (Jugador j : this.jugadores.values()) {
			Set<Ficha> repartidas = new HashSet<Ficha>();
			for (int i = 0; i < 14; i++) {
				repartidas.add(getFicha());
			}
			j.setMisFichas(repartidas);
		}
	}
	
	/*
	 * Saca una ficha de la bolsa aleatoriamente
	 */
	public Ficha getFicha() {
		Object[] llaves = this.bolsafichas.keySet().toArray();
		String randomKey = (String) llaves[new Random().nextInt(llaves.length)];
		Ficha f = this.bolsafichas.get(randomKey);
		this.bolsafichas.remove(randomKey);
		return f;
	}
	
	
	
	public int getIdPartida() {
		return idPartida;
	}

	public void setIdPartida(int idPartida) {
		this.idPartida = idPartida;
	}

	public Tablero getTablero() {
		return tablero;
	}

	public void setTablero(Tablero tablero) {
		this.tablero = tablero;
	}

	public HashMap<String, Ficha> getBolsafichas() {
		return bolsafichas;
	}

	public void setBolsafichas(HashMap<String, Ficha> bolsafichas) {
		this.bolsafichas = bolsafichas;
	}

	public HashMap<String, Jugador> getJugadores() {
		return jugadores;
	}

	public void setJugadores(HashMap<String, Jugador> jugadores) {
		this.jugadores = jugadores;
	}

	public String getStado() {
		return stado;
	}

	public void setStado(String stado) {
		this.stado = stado;
	}
	
}
