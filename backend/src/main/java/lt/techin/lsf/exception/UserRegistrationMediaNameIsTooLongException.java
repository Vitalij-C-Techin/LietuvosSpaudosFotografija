package lt.techin.lsf.exception;

public class UserRegistrationMediaNameIsTooLongException extends RuntimeException {
    public UserRegistrationMediaNameIsTooLongException(String message) {
        super(message);
    }
}
