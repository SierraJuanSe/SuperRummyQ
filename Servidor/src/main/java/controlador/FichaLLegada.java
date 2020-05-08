package controlador;

public class FichaLLegada {
	private String id;
	private int espacio;
	
	public FichaLLegada(String id, int espacio) {
		this.id = id;
		this.espacio = espacio;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public int getEspacio() {
		return espacio;
	}

	public void setEspacio(int espacio) {
		this.espacio = espacio;
	}

	@Override
	public String toString() {
		return "FichaLLegada [id=" + id + ", espacio=" + espacio + "]";
	}
	
	
}
