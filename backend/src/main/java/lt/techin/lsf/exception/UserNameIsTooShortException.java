package lt.techin.lsf.exception;

public class UserNameIsTooShortException extends RuntimeException {
    public UserNameIsTooShortException(String message) {
        super(message);
    }
}