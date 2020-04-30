package modelo;

import java.util.ArrayList;

public class Escalera extends Jugada{

	public Escalera(String id, String estado) {
		super(id, estado);
		// TODO Auto-generated constructor stub
	}

	@Override
	public boolean isValido(ArrayList<Ficha> posibleJugada) {
		if(posibleJugada.size() >= 3 && posibleJugada.size() <= 13) {
			for (int i = 0; i < posibleJugada.size() - 1; i++) {
				if(posibleJugada.get(i).getValue() + 1 != posibleJugada.get(i+1).getValue()
						|| !posibleJugada.get(i).getColor().equals(posibleJugada.get(i+1).getColor())) {
					return false;
				}
			}
			return true;
		}
		return false;
	}


}
