package lt.techin.lsf.model.requests;

import lt.techin.lsf.exception.ForgotPasswordException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;

//@DataJpaTest
//@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
class ForgetPasswordRequestTests {

    @Test
    void validForgetPasswordRequestShouldNotThrowException() {
        ForgetPasswordRequest forgetPasswordRequest = ForgetPasswordRequest.builder()
                .email("mytest@mail.com").build();
        assertDoesNotThrow(forgetPasswordRequest::validateData);
    }

    @ParameterizedTest
    @ValueSource(strings = {"myTestmail.com", "myTestmailcom", "myTestmail@.com", "a1??.@com",
                            "mytestverylongmailwithlonglengthmorethan60characters@example.com"
                            })
    void invalidForgetPasswordRequestShouldThrowException(String invalidEmail) {
        ForgetPasswordRequest forgetPasswordRequest = ForgetPasswordRequest.builder()
                .email(invalidEmail).build();

        assertThrows(ForgotPasswordException.class, forgetPasswordRequest::validateData);
    }
}