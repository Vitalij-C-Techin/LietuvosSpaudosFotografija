package lt.techin.lsf.exception;

public class UserRegistrationEmailIsTooLongException extends RuntimeException {
    public UserRegistrationEmailIsTooLongException(String message) {
        super(message);
    }
}