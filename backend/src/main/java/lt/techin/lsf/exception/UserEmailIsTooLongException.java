package lt.techin.lsf.exception;

public class UserEmailIsTooLongException extends RuntimeException {
    public UserEmailIsTooLongException(String message) {
        super(message);
    }
}