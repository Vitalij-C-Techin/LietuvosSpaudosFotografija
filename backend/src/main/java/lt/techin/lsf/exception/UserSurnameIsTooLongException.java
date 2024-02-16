package lt.techin.lsf.exception;

public class UserSurnameIsTooLongException extends RuntimeException {
    public UserSurnameIsTooLongException(String message) {
        super(message);
    }
}