package lt.techin.lsf.exception;

public class UserRegistrationNameIsTooShortException extends RuntimeException {
    public UserRegistrationNameIsTooShortException(String message) {
        super(message);
    }
}