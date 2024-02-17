package lt.techin.lsf.exception;

public class UserRegistrationPasswordIsTooLongException extends RuntimeException {
    public UserRegistrationPasswordIsTooLongException(String message) {
        super(message);
    }
}