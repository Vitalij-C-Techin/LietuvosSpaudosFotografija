package lt.techin.lsf.exception;

public class UserSurnameIsTooShortException extends RuntimeException {
    public UserSurnameIsTooShortException(String message) {
        super(message);
    }
}