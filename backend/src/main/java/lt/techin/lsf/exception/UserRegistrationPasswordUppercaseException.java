package lt.techin.lsf.exception;

public class UserRegistrationPasswordUppercaseException extends RuntimeException {
    public UserRegistrationPasswordUppercaseException(String message) {
        super(message);
    }
}