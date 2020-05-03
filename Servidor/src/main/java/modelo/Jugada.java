package modelo;

import java.util.ArrayList;
import java.util.Iterator;



public abstract class Jugada {
	private String id;
	private String estado;
	ArrayList<Ficha> fichas;
	
	
	public Jugada(String id, String estado) {
		this.id = id;
		this.estado = estado;
		fichas = new ArrayList<Ficha>();
	}
	
	public abstract boolean isValido(ArrayList<Ficha> posibleJugada);
	
	public boolean insertFicha(Ficha f) {
		ArrayList<Ficha> temp = new ArrayList<Ficha>();
		for (Ficha ficha : this.fichas) {
			temp.add(ficha);
		}
		temp.add(f);
		if(isValido(temp)) {
			return this.fichas.add(f);
		}
		return false;
	}
	
	public boolean removeFicha(Ficha f) {
		Ficha ficha = getFicha(f);
		if(ficha != null) {
			return this.fichas.remove(ficha);
		}
		return false;
	}
	
	public Ficha getFicha(Ficha f){
		Iterator<Ficha> ficha = this.fichas.iterator();
		
		while(ficha.hasNext()) {
			Ficha fich =  ficha.next();
			if(fich.igual(f)) {
				return fich;
			}
		}
		
		return null;
	}
	
	public String getId() {
		return id;
	}
	
	public void setId(String id) {
		this.id = id;
	}
	
	public String getEstado() {
		return estado;
	}
	
	public void setEstado(String estado) {
		this.estado = estado;
	}
	
	public ArrayList<Ficha> getFichas() {
		return fichas;
	}
	
	public boolean setFichas(ArrayList<Ficha> fichas) {
		if(isValido(fichas)) {
			this.fichas = fichas;
			return true;
		}
		return false;
	}
	
}
