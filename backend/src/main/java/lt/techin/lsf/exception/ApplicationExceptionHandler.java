package lt.techin.lsf.exception;

import lt.techin.lsf.model.response.ErrorResponse;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;


@ControllerAdvice
public class ApplicationExceptionHandler {
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
    @ExceptionHandler({UserRegistrationException.class})
    protected ResponseEntity<ErrorResponse> handle(UserRegistrationException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(
                        ErrorResponse.builder()
                                .code(exception.getClass().getSimpleName())
                                .message(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler({UserRegistrationPhoneNumberInvalidFormatException.class})
    protected ResponseEntity<ErrorResponse> handle(UserRegistrationPhoneNumberInvalidFormatException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(
                        ErrorResponse.builder()
                                .code(exception.getClass().getSimpleName())
                                .message(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler({UserRegistrationSurnameInvalidFormatException.class})
    protected ResponseEntity<ErrorResponse> handle(UserRegistrationSurnameInvalidFormatException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(
                        ErrorResponse.builder()
                                .code(exception.getClass().getSimpleName())
                                .message(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler({UserRegistrationSurnameIsTooLongException.class})
    protected ResponseEntity<ErrorResponse> handle(UserRegistrationSurnameIsTooLongException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(
                        ErrorResponse.builder()
                                .code(exception.getClass().getSimpleName())
                                .message(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler({UserRegistrationSurnameIsTooShortException.class})
    protected ResponseEntity<ErrorResponse> handle(UserRegistrationSurnameIsTooShortException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(
                        ErrorResponse.builder()
                                .code(exception.getClass().getSimpleName())
                                .message(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler({UserRegistrationNameInvalidFormatException.class})
    protected ResponseEntity<ErrorResponse> handle(UserRegistrationNameInvalidFormatException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(
                        ErrorResponse.builder()
                                .code(exception.getClass().getSimpleName())
                                .message(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler({UserRegistrationNameIsTooLongException.class})
    protected ResponseEntity<ErrorResponse> handle(UserRegistrationNameIsTooLongException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(
                        ErrorResponse.builder()
                                .code(exception.getClass().getSimpleName())
                                .message(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler({UserRegistrationNameIsTooShortException.class})
    protected ResponseEntity<ErrorResponse> handle(UserRegistrationNameIsTooShortException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(
                        ErrorResponse.builder()
                                .code(exception.getClass().getSimpleName())
                                .message(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler({UserRegistrationTooOldException.class})
    protected ResponseEntity<ErrorResponse> handle(UserRegistrationTooOldException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(
                        ErrorResponse.builder()
                                .code(exception.getClass().getSimpleName())
                                .message(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler({UserRegistrationTooYoungException.class})
    protected ResponseEntity<ErrorResponse> handle(UserRegistrationTooYoungException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(
                        ErrorResponse.builder()
                                .code(exception.getClass().getSimpleName())
                                .message(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler({UserRegistrationPasswordUppercaseException.class})
    protected ResponseEntity<ErrorResponse> handle(UserRegistrationPasswordUppercaseException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(
                        ErrorResponse.builder()
                                .code(exception.getClass().getSimpleName())
                                .message(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler({UserRegistrationPasswordLowercaseException.class})
    protected ResponseEntity<ErrorResponse> handle(UserRegistrationPasswordLowercaseException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(
                        ErrorResponse.builder()
                                .code(exception.getClass().getSimpleName())
                                .message(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler({UserRegistrationPasswordDigitException.class})
    protected ResponseEntity<ErrorResponse> handle(UserRegistrationPasswordDigitException exception) {
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

    @ExceptionHandler({UserRegistrationEmailIsTooLongException.class})
    protected ResponseEntity<ErrorResponse> handle(UserRegistrationEmailIsTooLongException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(
                        ErrorResponse.builder()
                                .code(exception.getClass().getSimpleName())
                                .message(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler({UserRegistrationEmailIsTooShortException.class})
    protected ResponseEntity<ErrorResponse> handle(UserRegistrationEmailIsTooShortException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(
                        ErrorResponse.builder()
                                .code(exception.getClass().getSimpleName())
                                .message(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler({UserRegistrationEmailInvalidFormatException.class})
    protected ResponseEntity<ErrorResponse> handle(UserRegistrationEmailInvalidFormatException exception) {
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
    protected ResponseEntity<ErrorResponse> handle(TokenExpiredException exception){
        return ResponseEntity.status(HttpStatus.REQUEST_TIMEOUT).body(
        ErrorResponse.builder()
                .code(exception.getClass().getSimpleName())
                .message(exception.getMessage())
                .build()
                );
    }
}