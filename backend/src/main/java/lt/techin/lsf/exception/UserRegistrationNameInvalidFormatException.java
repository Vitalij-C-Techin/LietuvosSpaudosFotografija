package lt.techin.lsf.exception;

public class UserRegistrationNameInvalidFormatException extends RuntimeException {
    public UserRegistrationNameInvalidFormatException(String message) {
        super(message);
    }
}