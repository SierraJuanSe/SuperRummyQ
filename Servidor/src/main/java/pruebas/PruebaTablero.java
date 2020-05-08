package pruebas;

import modelo.Partida;

public class PruebaTablero {

	public static void main(String[] args) {
		String id = "r10b";
		String color = id.substring(0, 1);
		int valor;
		if(id.length()<4) {
			valor = Integer.valueOf(id.substring(1, 2));
		}else {
			valor = Integer.valueOf(id.substring(1, 3));
		}
		
		System.out.println(id);
		System.out.println(color);
		System.out.println(valor);
	}

}
