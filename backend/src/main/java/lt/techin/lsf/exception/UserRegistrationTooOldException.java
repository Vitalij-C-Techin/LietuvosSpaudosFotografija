package lt.techin.lsf.exception;

public class UserRegistrationTooOldException extends RuntimeException {
    public UserRegistrationTooOldException(String message) {
        super(message);
    }
}