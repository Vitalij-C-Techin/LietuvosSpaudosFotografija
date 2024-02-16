package lt.techin.lsf.exception;

public class UserIsTooOldException extends RuntimeException {
    public UserIsTooOldException(String message) {
        super(message);
    }
}