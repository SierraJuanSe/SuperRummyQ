package modelo;

import java.util.ArrayList;

public class Tablero {
	private ArrayList<Jugada> jugadas;

	public Tablero() {
		this.jugadas = new ArrayList<Jugada>();
	}
	
	public boolean insertJugada(String id, ArrayList<Ficha> fichas) {
		Jugada trio = new Trio(id, "vacio");
		Jugada escalera =  new Escalera(id, "vacio");
		
		if(trio.setFichas(fichas)) {
			Jugada existe = buscarJugada(id);
			if(existe != null) {
				return existe.setFichas(fichas);
			}else {
				this.jugadas.add(trio);
			}
			return true;
		}else if(escalera.setFichas(fichas)) {
			Jugada existe = buscarJugada(id);
			if(existe != null) {
				return existe.setFichas(fichas);
			}else {
				this.jugadas.add(escalera);
			}
			return true;
		}
		return false;
	}
	
	public boolean removejugada(Jugada jugada) {
		return this.jugadas.remove(jugada);
	}
	
	public Jugada validarTablero() {
		for (Jugada jugada : this.jugadas) {
			if(!jugada.isValido(jugada.getFichas())) {
				this.jugadas.remove(jugada);
				return jugada;
			}
		}
		return null;
	}
	
	public Jugada buscarJugada(String id) {
		for (Jugada jugada : this.jugadas) {
			if(id == jugada.getId()) {
				return jugada;
			}
		}		
		return null;
	}

	public ArrayList<Jugada> getJugadas() {
		return jugadas;
	}

	public void setJugadas(ArrayList<Jugada> jugadas) {
		this.jugadas = jugadas;
	}
	
}
