package lt.techin.lsf.exception;

public class UserPasswordIsTooLongException extends RuntimeException {
    public UserPasswordIsTooLongException(String message) {
        super(message);
    }
}