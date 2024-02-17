package lt.techin.lsf.exception;

public class UserRegistrationTooYoungException extends RuntimeException {
    public UserRegistrationTooYoungException(String message) {
        super(message);
    }
}