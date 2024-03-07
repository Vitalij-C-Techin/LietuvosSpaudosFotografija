package lt.techin.lsf.model.requests;

import lt.techin.lsf.exception.UserRegistrationEmailInvalidFormatException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;

class ForgetPasswordRequestTests {

    @Test
    void validForgetPasswordRequestShouldNotThrowException() {
        ForgetPasswordRequest forgetPasswordRequest = ForgetPasswordRequest.builder()
                .email("mytest@mail.com").build();
        assertDoesNotThrow(forgetPasswordRequest::validateData);
    }

    @ParameterizedTest
    @ValueSource(strings = {"myTestmail.com", "myTestmailcom", "myTestmail@.com", "a1??.@com"
                            })
    void invalidForgetPasswordRequestShouldThrowException(String invalidEmail) {
        ForgetPasswordRequest forgetPasswordRequest = ForgetPasswordRequest.builder()
                .email(invalidEmail).build();

        assertThrows(UserRegistrationEmailInvalidFormatException.class, forgetPasswordRequest::validateData);
    }
}