package modelo;


import java.util.HashSet;
import java.util.Set;

import org.java_websocket.WebSocket;

public class Jugador {
	private String nombre;
	private WebSocket cliente;
	private int puntaje;
	private int numFichas;
	private int turno;
	//private int ronda;
	private Set<Ficha> misFichas;
	
	public Jugador(String nombre, int turno, WebSocket conn) {
		this.nombre = nombre;
		this.turno = turno;
		this.setCliente(conn);
		this.puntaje = 0;
		this.numFichas = 0;
		this.misFichas = new HashSet<Ficha>() ;
	}

	
	public void hacerJugada() {
		
	}
	
	
	public void robarFicha(Ficha f) {
		this.misFichas.add(f);
	}
	
	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public int getPuntaje() {
		return puntaje;
	}

	public void setPuntaje(int puntaje) {
		this.puntaje = puntaje;
	}

	public int getNumFichas() {
		return numFichas;
	}

	public void setNumFichas(int numFichas) {
		this.numFichas = numFichas;
	}

	public int getTurno() {
		return turno;
	}

	public void setTurno(int turno) {
		this.turno = turno;
	}

	


	public Set<Ficha> getMisFichas() {
		return misFichas;
	}


	public void setMisFichas(Set<Ficha> misFichas) {
		this.misFichas = misFichas;
	}


	public WebSocket getCliente() {
		return cliente;
	}


	public void setCliente(WebSocket cliente) {
		this.cliente = cliente;
	}
	
	

	
	
}
