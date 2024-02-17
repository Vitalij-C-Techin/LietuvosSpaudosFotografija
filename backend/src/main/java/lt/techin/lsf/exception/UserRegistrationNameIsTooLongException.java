package lt.techin.lsf.exception;

public class UserRegistrationNameIsTooLongException extends RuntimeException {
    public UserRegistrationNameIsTooLongException(String message) {
        super(message);
    }
}