package lt.techin.lsf.exception;

public class UserRegistrationPasswordIsTooShortException extends RuntimeException {
    public UserRegistrationPasswordIsTooShortException(String message) {
        super(message);
    }
}