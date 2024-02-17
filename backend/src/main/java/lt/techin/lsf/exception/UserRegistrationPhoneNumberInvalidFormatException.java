package lt.techin.lsf.exception;

public class UserRegistrationPhoneNumberInvalidFormatException extends RuntimeException {
    public UserRegistrationPhoneNumberInvalidFormatException(String message) {
        super(message);
    }
}