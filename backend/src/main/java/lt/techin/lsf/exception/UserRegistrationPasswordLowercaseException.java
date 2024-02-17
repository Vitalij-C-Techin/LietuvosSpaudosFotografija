package lt.techin.lsf.exception;

public class UserRegistrationPasswordLowercaseException extends RuntimeException {
    public UserRegistrationPasswordLowercaseException(String message) {
        super(message);
    }
}