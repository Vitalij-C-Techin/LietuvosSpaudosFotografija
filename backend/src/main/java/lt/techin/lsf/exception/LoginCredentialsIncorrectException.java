package lt.techin.lsf.exception;

public class LoginCredentialsIncorrectException extends RuntimeException {
    public LoginCredentialsIncorrectException(String message) {
        super(message);
    }
}