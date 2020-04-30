package BackEnd;

import java.net.UnknownHostException;
import utilidades.ServerConn;

class main {

	public static void main(String[] args) {
		
		
		try {
			ServerConn server = new ServerConn();
			server.run();
		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		

	}

}
