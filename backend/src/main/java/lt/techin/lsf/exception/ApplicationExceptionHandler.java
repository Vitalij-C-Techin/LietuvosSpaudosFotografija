package lt.techin.lsf.exception;

import jakarta.persistence.EntityNotFoundException;
import lt.techin.lsf.model.response.ErrorResponse;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageConversionException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.util.stream.Collectors;

@ControllerAdvice
public class ApplicationExceptionHandler {

    @ExceptionHandler({MethodArgumentNotValidException.class})
    protected ResponseEntity<ErrorResponse> handle(MethodArgumentNotValidException exception) {
        String errorMessage = exception.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(fieldError -> fieldError.getField() + ": " + fieldError.getDefaultMessage())
                .collect(Collectors.joining("; "));
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ErrorResponse.builder()
                        .code(exception.getClass().getSimpleName())
                        .message(errorMessage)
                        .build());
    }

    @ExceptionHandler({HttpMessageConversionException.class})
    protected ResponseEntity<ErrorResponse> handle(Exception exception) {
        return ResponseEntity.badRequest()
                .body(ErrorResponse.builder()
                        .code(exception.getClass().getSimpleName())
                        .message(exception.getMessage())
                        .build());
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ErrorResponse> handle(EntityNotFoundException exception) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ErrorResponse.builder()
                        .code(exception.getClass().getSimpleName())
                        .message(exception.getMessage())
                        .build()
                );
    }

    @ExceptionHandler(DisabledException.class)
    public ResponseEntity<ErrorResponse> handle(DisabledException exception) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(ErrorResponse.builder()
                        .code(exception.getClass().getSimpleName())
                        .message(exception.getMessage())
                        .build()
                );
    }

    @ExceptionHandler({CompetitionExistsException.class})
    protected ResponseEntity<ErrorResponse> handle(CompetitionExistsException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(
                        ErrorResponse.builder()
                                .code(exception.getClass().getSimpleName())
                                .message(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler({CategoryExistsException.class})
    protected ResponseEntity<ErrorResponse> handle(CategoryExistsException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(
                        ErrorResponse.builder()
                                .code(exception.getClass().getSimpleName())
                                .message(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler({NullPointerException.class})
    protected ResponseEntity<ErrorResponse> handle(NullPointerException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(
                        ErrorResponse.builder()
                                .code(exception.getClass().getSimpleName())
                                .message(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler({UserRegistrationPasswordFormatException.class})
    protected ResponseEntity<ErrorResponse> handle(UserRegistrationPasswordFormatException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(
                        ErrorResponse.builder()
                                .code(exception.getClass().getSimpleName())
                                .message(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler({UserRegistrationPasswordIsTooLongException.class})
    protected ResponseEntity<ErrorResponse> handle(UserRegistrationPasswordIsTooLongException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(
                        ErrorResponse.builder()
                                .code(exception.getClass().getSimpleName())
                                .message(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler({UserRegistrationPasswordIsTooShortException.class})
    protected ResponseEntity<ErrorResponse> handle(UserRegistrationPasswordIsTooShortException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(
                        ErrorResponse.builder()
                                .code(exception.getClass().getSimpleName())
                                .message(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler({IllegalArgumentException.class})
    protected ResponseEntity<ErrorResponse> handle(IllegalArgumentException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(
                        ErrorResponse.builder()
                                .code(exception.getClass().getSimpleName())
                                .message(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler({IllegalStateException.class})
    protected ResponseEntity<ErrorResponse> handle(IllegalStateException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(
                        ErrorResponse.builder()
                                .code(exception.getClass().getSimpleName())
                                .message(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler({MethodArgumentTypeMismatchException.class})
    protected ResponseEntity<ErrorResponse> handle(MethodArgumentTypeMismatchException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(
                        ErrorResponse.builder()
                                .code(exception.getClass().getSimpleName())
                                .message(exception.getMessage())
                                .build()
                );
    }


    @ExceptionHandler({ErrorException.class})
    protected ResponseEntity<ErrorResponse> handle(ErrorException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(
                        ErrorResponse.builder()
                                .code(exception.getClass().getSimpleName())
                                .message(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler({BadRequestException.class})
    protected ResponseEntity<ErrorResponse> handle(BadRequestException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(
                        ErrorResponse.builder()
                                .code(exception.getClass().getSimpleName())
                                .message(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler({UserNotFoundException.class})
    protected ResponseEntity<ErrorResponse> handle(UserNotFoundException exception) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(
                        ErrorResponse.builder()
                                .code(exception.getClass().getSimpleName())
                                .message(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler({UserExistsException.class})
    protected ResponseEntity<ErrorResponse> handle(UserExistsException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(
                        ErrorResponse.builder()
                                .code(exception.getClass().getSimpleName())
                                .message(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler({UserNotAuthenticatedException.class})
    protected ResponseEntity<ErrorResponse> handle(UserNotAuthenticatedException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(
                        ErrorResponse.builder()
                                .code(exception.getClass().getSimpleName())
                                .message(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler({BadCredentialsException.class})
    protected ResponseEntity<ErrorResponse> handle(BadCredentialsException exception) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(
                        ErrorResponse.builder()
                                .code(exception.getClass().getSimpleName())
                                .message(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler({TokenExpiredException.class})
    protected ResponseEntity<ErrorResponse> handle(TokenExpiredException exception) {
        return ResponseEntity.status(HttpStatus.REQUEST_TIMEOUT)
                .body(
                        ErrorResponse.builder()
                                .code(exception.getClass().getSimpleName())
                                .message(exception.getMessage())
                                .build()
                );
    }
}