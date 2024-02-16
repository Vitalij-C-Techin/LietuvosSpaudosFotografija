package lt.techin.lsf.exception;

public class UserEmailInvalidFormatException extends RuntimeException {
    public UserEmailInvalidFormatException(String message) {
        super(message);
    }
}