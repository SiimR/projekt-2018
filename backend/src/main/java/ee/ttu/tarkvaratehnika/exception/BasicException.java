package ee.ttu.tarkvaratehnika.exception;

public abstract class BasicException extends RuntimeException {
	
	public BasicException() {
		super();
	}
	
	public BasicException(String message) {
		super(message);
	}
	
	public BasicException(Throwable cause) {
		super(cause);
	}
	
	public BasicException(String message, Throwable cause) {
		super(message, cause);
	}
}
