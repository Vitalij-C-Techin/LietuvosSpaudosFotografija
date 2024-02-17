package lt.techin.lsf.exception;

public class UserRegistrationEmailInvalidFormatException extends RuntimeException {
    public UserRegistrationEmailInvalidFormatException(String message) {
        super(message);
    }
}