package lt.techin.lsf.exception;

public class UserNameIsTooLongException extends RuntimeException {
    public UserNameIsTooLongException(String message) {
        super(message);
    }
}