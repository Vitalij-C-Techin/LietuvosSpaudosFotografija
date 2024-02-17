package lt.techin.lsf.exception;

public class UserRegistrationSurnameIsTooLongException extends RuntimeException {
    public UserRegistrationSurnameIsTooLongException(String message) {
        super(message);
    }
}