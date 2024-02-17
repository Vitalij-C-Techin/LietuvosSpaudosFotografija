package lt.techin.lsf.exception;

public class UserRegistrationSurnameInvalidFormatException extends RuntimeException {
    public UserRegistrationSurnameInvalidFormatException(String message) {
        super(message);
    }
}