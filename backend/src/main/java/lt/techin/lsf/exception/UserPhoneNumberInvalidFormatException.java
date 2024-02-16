package lt.techin.lsf.exception;

public class UserPhoneNumberInvalidFormatException extends RuntimeException {
    public UserPhoneNumberInvalidFormatException(String message) {
        super(message);
    }
}