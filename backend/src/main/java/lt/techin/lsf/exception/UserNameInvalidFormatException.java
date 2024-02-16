package lt.techin.lsf.exception;

public class UserNameInvalidFormatException extends RuntimeException {
    public UserNameInvalidFormatException(String message) {
        super(message);
    }
}