package lt.techin.lsf.exception;

public class UserCredentialsIncorrectException extends RuntimeException {
    public UserCredentialsIncorrectException(String message) {
        super(message);
    }
}