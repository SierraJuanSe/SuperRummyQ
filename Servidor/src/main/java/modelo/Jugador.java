package modelo;


import java.util.ArrayList;
import java.util.HashMap;
import org.java_websocket.WebSocket;

public class Jugador {
	private String nombre;
	private WebSocket cliente;
	private int puntaje;
	private int numFichas;
	private int turno;
	//private int ronda;
	private HashMap<String, Ficha> misFichas;
	
	public Jugador(String nombre, int turno, WebSocket conn) {
		this.nombre = nombre;
		this.turno = turno;
		this.setCliente(conn);
		this.puntaje = 0;
		this.numFichas = 0;
		this.misFichas = new HashMap<String, Ficha>() ;
	}

	
	public boolean hacerJugada(ArrayList<Ficha> fichas) {
		boolean borrados = true;
		for (Ficha ficha : fichas) {
			if(this.misFichas.remove(ficha.getId()) == null) {
				borrados = false;
			}
		}
		
		return borrados;
	}
	
	public Ficha getFicha(String key) {
		return this.misFichas.get(key);
	}
	
	public void robarFicha(String key,Ficha f) {
		this.misFichas.put(key, f);
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
		this.numFichas = this.misFichas.size();
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

	
	public HashMap<String, Ficha> getMisFichas() {
		return misFichas;
	}


	public void setMisFichas(HashMap<String, Ficha> misFichas) {
		this.misFichas = misFichas;
	}


	public WebSocket getCliente() {
		return cliente;
	}


	public void setCliente(WebSocket cliente) {
		this.cliente = cliente;
	}
		
}
