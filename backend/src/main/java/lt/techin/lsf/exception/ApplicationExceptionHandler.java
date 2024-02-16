package lt.techin.lsf.exception;

import lt.techin.lsf.model.response.ErrorResponse;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;


@ControllerAdvice
public class ApplicationExceptionHandler {

    @ExceptionHandler({IllegalArgumentException.class})
    protected ResponseEntity<ErrorResponse> handle(IllegalArgumentException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(
                        ErrorResponse.builder()
                                .code(IllegalArgumentException.class.getSimpleName())
                                .message(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler({IllegalStateException.class})
    protected ResponseEntity<ErrorResponse> handle(IllegalStateException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(
                        ErrorResponse.builder()
                                .code(IllegalStateException.class.getSimpleName())
                                .message(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler({MethodArgumentTypeMismatchException.class})
    protected ResponseEntity<ErrorResponse> handle(MethodArgumentTypeMismatchException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(
                        ErrorResponse.builder()
                                .code(MethodArgumentTypeMismatchException.class.getSimpleName())
                                .message(exception.getMessage())
                                .build()
                );
    }


    @ExceptionHandler({ErrorException.class})
    protected ResponseEntity<ErrorResponse> handle(ErrorException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(
                        ErrorResponse.builder()
                                .code(ErrorException.class.getSimpleName())
                                .message(exception.getMessage())
                                .build()
                );
    }


    @ExceptionHandler({BadRequestException.class})
    protected ResponseEntity<ErrorResponse> handle(BadRequestException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(
                        ErrorResponse.builder()
                                .code(BadRequestException.class.getSimpleName())
                                .message(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler({UserNotFoundException.class})
    protected ResponseEntity<ErrorResponse> handle(UserNotFoundException exception) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(
                        ErrorResponse.builder()
                                .code(UserNotFoundException.class.getSimpleName())
                                .message(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler({UserExistsException.class})
    protected ResponseEntity<ErrorResponse> handle(UserExistsException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(
                        ErrorResponse.builder()
                                .code(UserExistsException.class.getSimpleName())
                                .message(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler({UserNotAuthenticatedException.class})
    protected ResponseEntity<ErrorResponse> handle(UserNotAuthenticatedException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(
                        ErrorResponse.builder()
                                .code(UserNotAuthenticatedException.class.getSimpleName())
                                .message(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler({UserCredentialsIncorrectException.class})
    protected ResponseEntity<ErrorResponse> handle(UserCredentialsIncorrectException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(
                        ErrorResponse.builder()
                                .code(UserCredentialsIncorrectException.class.getSimpleName())
                                .message(exception.getMessage())
                                .build()
                );
    }
}