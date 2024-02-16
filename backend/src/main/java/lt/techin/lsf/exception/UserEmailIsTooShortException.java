package lt.techin.lsf.exception;

public class UserEmailIsTooShortException extends RuntimeException {
    public UserEmailIsTooShortException(String message) {
        super(message);
    }
}