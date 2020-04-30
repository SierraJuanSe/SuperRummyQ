package modelo;

import java.util.ArrayList;

public class Tablero {
	private ArrayList<Jugada> jugadas;

	public Tablero() {
		this.jugadas = new ArrayList<Jugada>();
	}
	
	public void insertJugada(String id, ArrayList<Ficha> fichas) {
		
	}

	public ArrayList<Jugada> getJugadas() {
		return jugadas;
	}

	public void setJugadas(ArrayList<Jugada> jugadas) {
		this.jugadas = jugadas;
	}
	
	
	
}
