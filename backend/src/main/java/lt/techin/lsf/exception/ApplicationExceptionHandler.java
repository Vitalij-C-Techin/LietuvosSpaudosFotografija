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

    @ExceptionHandler({UserPhoneNumberInvalidFormatException.class})
    protected ResponseEntity<ErrorResponse> handle(UserPhoneNumberInvalidFormatException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(
                        ErrorResponse.builder()
                                .code(exception.getClass().getSimpleName())
                                .message(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler({UserSurnameInvalidFormatException.class})
    protected ResponseEntity<ErrorResponse> handle(UserSurnameInvalidFormatException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(
                        ErrorResponse.builder()
                                .code(exception.getClass().getSimpleName())
                                .message(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler({UserSurnameIsTooLongException.class})
    protected ResponseEntity<ErrorResponse> handle(UserSurnameIsTooLongException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(
                        ErrorResponse.builder()
                                .code(exception.getClass().getSimpleName())
                                .message(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler({UserSurnameIsTooShortException.class})
    protected ResponseEntity<ErrorResponse> handle(UserSurnameIsTooShortException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(
                        ErrorResponse.builder()
                                .code(exception.getClass().getSimpleName())
                                .message(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler({UserNameInvalidFormatException.class})
    protected ResponseEntity<ErrorResponse> handle(UserNameInvalidFormatException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(
                        ErrorResponse.builder()
                                .code(exception.getClass().getSimpleName())
                                .message(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler({UserNameIsTooLongException.class})
    protected ResponseEntity<ErrorResponse> handle(UserNameIsTooLongException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(
                        ErrorResponse.builder()
                                .code(exception.getClass().getSimpleName())
                                .message(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler({UserNameIsTooShortException.class})
    protected ResponseEntity<ErrorResponse> handle(UserNameIsTooShortException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(
                        ErrorResponse.builder()
                                .code(exception.getClass().getSimpleName())
                                .message(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler({UserIsTooOldException.class})
    protected ResponseEntity<ErrorResponse> handle(UserIsTooOldException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(
                        ErrorResponse.builder()
                                .code(exception.getClass().getSimpleName())
                                .message(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler({UserIsTooYoungException.class})
    protected ResponseEntity<ErrorResponse> handle(UserIsTooYoungException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(
                        ErrorResponse.builder()
                                .code(exception.getClass().getSimpleName())
                                .message(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler({UserPasswordUppercaseException.class})
    protected ResponseEntity<ErrorResponse> handle(UserPasswordUppercaseException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(
                        ErrorResponse.builder()
                                .code(exception.getClass().getSimpleName())
                                .message(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler({UserPasswordLowercaseException.class})
    protected ResponseEntity<ErrorResponse> handle(UserPasswordLowercaseException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(
                        ErrorResponse.builder()
                                .code(exception.getClass().getSimpleName())
                                .message(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler({UserPasswordDigitException.class})
    protected ResponseEntity<ErrorResponse> handle(UserPasswordDigitException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(
                        ErrorResponse.builder()
                                .code(exception.getClass().getSimpleName())
                                .message(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler({UserPasswordIsTooLongException.class})
    protected ResponseEntity<ErrorResponse> handle(UserPasswordIsTooLongException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(
                        ErrorResponse.builder()
                                .code(exception.getClass().getSimpleName())
                                .message(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler({UserPasswordIsTooShortException.class})
    protected ResponseEntity<ErrorResponse> handle(UserPasswordIsTooShortException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(
                        ErrorResponse.builder()
                                .code(exception.getClass().getSimpleName())
                                .message(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler({UserEmailIsTooLongException.class})
    protected ResponseEntity<ErrorResponse> handle(UserEmailIsTooLongException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(
                        ErrorResponse.builder()
                                .code(exception.getClass().getSimpleName())
                                .message(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler({UserEmailIsTooShortException.class})
    protected ResponseEntity<ErrorResponse> handle(UserEmailIsTooShortException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(
                        ErrorResponse.builder()
                                .code(exception.getClass().getSimpleName())
                                .message(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler({UserEmailInvalidFormatException.class})
    protected ResponseEntity<ErrorResponse> handle(UserEmailInvalidFormatException exception) {
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

    @ExceptionHandler({UserCredentialsIncorrectException.class})
    protected ResponseEntity<ErrorResponse> handle(UserCredentialsIncorrectException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(
                        ErrorResponse.builder()
                                .code(exception.getClass().getSimpleName())
                                .message(exception.getMessage())
                                .build()
                );
    }
}