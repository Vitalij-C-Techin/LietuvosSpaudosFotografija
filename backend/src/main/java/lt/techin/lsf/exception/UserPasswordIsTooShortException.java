package lt.techin.lsf.exception;

public class UserPasswordIsTooShortException extends RuntimeException {
    public UserPasswordIsTooShortException(String message) {
        super(message);
    }
}