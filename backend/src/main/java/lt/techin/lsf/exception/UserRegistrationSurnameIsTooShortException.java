package lt.techin.lsf.exception;

public class UserRegistrationSurnameIsTooShortException extends RuntimeException {
    public UserRegistrationSurnameIsTooShortException(String message) {
        super(message);
    }
}