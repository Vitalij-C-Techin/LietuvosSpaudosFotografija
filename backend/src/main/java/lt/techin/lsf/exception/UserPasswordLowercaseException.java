package lt.techin.lsf.exception;

public class UserPasswordLowercaseException extends RuntimeException {
    public UserPasswordLowercaseException(String message) {
        super(message);
    }
}