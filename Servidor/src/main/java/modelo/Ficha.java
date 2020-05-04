package modelo;

public class Ficha {
	public static final String[] colores = new String[] {"a", "y", "n", "r"};
	private String id;
	private String color;
	private int valor;
	
	public Ficha(String id,String color, int valor) {
		this.setId(id);
		this.color = color;
		this.valor = valor;
	}
	
	public boolean igual(Object o) {
		if(o instanceof Ficha) {
			Ficha f = (Ficha) o;
			if(this.valor == f.valor && this.color == f.color) {
				return true;
			}
		}
		return false;	
	}
	
	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public int getValue() {
		return valor;
	}

	public void setValue(int valor) {
		this.valor = valor;
	}

	@Override
	public String toString() {
		return "{'color': '"+this.color+"', 'valor': '"+this.valor+"'}";
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
	
	
	
}
