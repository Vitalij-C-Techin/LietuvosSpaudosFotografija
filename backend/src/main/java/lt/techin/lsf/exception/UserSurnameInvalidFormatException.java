package lt.techin.lsf.exception;

public class UserSurnameInvalidFormatException extends RuntimeException {
    public UserSurnameInvalidFormatException(String message) {
        super(message);
    }
}