package modelo;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;

public class Tablero {
	private HashMap<String, Jugada> jugadas;

	public Tablero() {
		this.jugadas = new HashMap<String, Jugada>();
	}
	
	public boolean insertJugada(String id, ArrayList<Ficha> fichas) {
		Jugada trio = new Trio(id, "vacio");
		Jugada escalera =  new Escalera(id, "vacio");
		
		if(trio.setFichas(fichas)) {
			Jugada existe = buscarJugada(id);
			if(existe != null) {
				return existe.setFichas(fichas);
			}else {
				this.jugadas.put(id, trio);
				return true;
			}
		}else if(escalera.setFichas(fichas)) {
			Jugada existe = buscarJugada(id);
			if(existe != null) {
				return existe.setFichas(fichas);
			}else {
				this.jugadas.put(id, escalera);
				return true;
			}
		}
		return false;
	}
	
	public Ficha getFicha(String id) {
		for (Jugada jugadas : this.jugadas.values()) {
			for(int i = 0 ; i < jugadas.getFichas().size() ; i++) {
				if(jugadas.getFichas().get(i).getId().equals(id)){
					 return jugadas.getFichas().get(i);
				}
			}
		}
		
		return null;
	}
	
	public void actualizarJugadas(ArrayList<String> jugadasActuales) {
		Iterator<String> it = this.jugadas.keySet().iterator();
		
		while (it.hasNext()) {
			String key = (String) it.next();
			if(!jugadasActuales.contains(key)) {
				it.remove();
			}
		}
		
	}
	
	public Jugada removejugada(String key) {
		return this.jugadas.remove(key);
	}
	
	public Jugada validarTablero() {
		for (String key : this.jugadas.keySet()) {
			Jugada j = this.jugadas.get(key);
			if(!j.isValido(j.getFichas())) {
				return this.jugadas.remove(key);
			}
		}
		return null;
	}
	
	public Jugada buscarJugada(String id) {
		return this.jugadas.get(id);
	}

	public HashMap<String, Jugada> getJugadas() {
		return jugadas;
	}

	public void setJugadas(HashMap<String, Jugada> jugadas) {
		this.jugadas = jugadas;
	}	
}
