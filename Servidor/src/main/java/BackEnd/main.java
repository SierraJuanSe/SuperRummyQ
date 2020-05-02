package BackEnd;

import controlador.ControladorPincipal;

class main {

	public static void main(String[] args) {
		
		ControladorPincipal cp = new ControladorPincipal(30000);
		cp.start();
		
	}

}
