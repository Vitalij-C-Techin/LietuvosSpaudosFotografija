package lt.techin.lsf.exception;

public class UserNotFoundByUuidException extends UserNotFoundException {
    public UserNotFoundByUuidException(String message) {
        super(message);
    }
}