package lt.techin.lsf.exception;

public class UserRegistrationEmailIsTooShortException extends RuntimeException {
    public UserRegistrationEmailIsTooShortException(String message) {
        super(message);
    }
}