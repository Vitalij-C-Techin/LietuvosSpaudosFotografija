package lt.techin.lsf.exception;

public class

ForgotPasswordException extends UserNotFoundException{
    public ForgotPasswordException(String message) {
        super(message);
    }
}
