package lt.techin.lsf.exception;

public class UserNotFoundByEmailException extends UserNotFoundException {
    public UserNotFoundByEmailException(String message) {
        super(message);
    }
}