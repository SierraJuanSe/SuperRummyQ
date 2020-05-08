package utilidades;

import java.net.InetSocketAddress;

import java.net.UnknownHostException;

import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;

import controlador.ControladorPincipal;


public class ServerConn extends WebSocketServer{
	
	
	public ServerConn(ControladorPincipal controlador,int port) throws UnknownHostException {
		super(new InetSocketAddress(port));
	}

	@Override
	public void onStart() {
		System.out.println("server started successfully");
	}
	
	@Override
	public void onOpen(WebSocket conn, ClientHandshake handshake) {
		
	}

	@Override
	public void onClose(WebSocket conn, int code, String reason, boolean remote) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void onMessage(WebSocket conn, String message) {
		
	}

	@Override
	public void onError(WebSocket conn, Exception ex) {
		// TODO Auto-generated method stub
		
	}
	

}
