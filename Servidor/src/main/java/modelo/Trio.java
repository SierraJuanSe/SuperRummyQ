package modelo;

import java.util.ArrayList;



public class Trio extends Jugada{

	public Trio(String id, String estado) {
		super(id, estado);
		
	}

	@Override
	public boolean isValido(ArrayList<Ficha> posibleJugada) {
		if(posibleJugada.size() >= 3 && posibleJugada.size() <= 4) {
				
				ArrayList<String> colorVisto =  new ArrayList<String>();
				colorVisto.add(posibleJugada.get(0).getColor());
				for (int i = 0; i < posibleJugada.size() - 1; i++) {
					if(posibleJugada.get(i).getValue() != posibleJugada.get(i+1).getValue() 
							|| colorVisto.contains(posibleJugada.get(i+1).getColor())) {
						return false;
					}else {
						colorVisto.add(posibleJugada.get(i+1).getColor());
					}
				}
				
				return true;
		}
		return false;
	}
	

}
