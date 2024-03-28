package lt.techin.lsf.exception;

public class CompetitionExistsException extends RuntimeException {
    public CompetitionExistsException(String message) {
        super(message);
    }
}