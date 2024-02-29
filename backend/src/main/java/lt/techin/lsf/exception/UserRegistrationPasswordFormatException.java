package lt.techin.lsf.exception;

public class UserRegistrationPasswordFormatException extends RuntimeException {
    public UserRegistrationPasswordFormatException(String message) {
        super(message);
    }
}