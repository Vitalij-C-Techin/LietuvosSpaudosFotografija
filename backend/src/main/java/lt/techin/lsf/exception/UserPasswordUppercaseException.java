package lt.techin.lsf.exception;

public class UserPasswordUppercaseException extends RuntimeException {
    public UserPasswordUppercaseException(String message) {
        super(message);
    }
}