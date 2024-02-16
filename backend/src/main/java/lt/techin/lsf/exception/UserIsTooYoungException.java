package lt.techin.lsf.exception;

public class UserIsTooYoungException extends RuntimeException {
    public UserIsTooYoungException(String message) {
        super(message);
    }
}