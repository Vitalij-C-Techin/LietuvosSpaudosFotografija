package lt.techin.lsf.validator;

import jakarta.validation.ConstraintValidatorContext;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

class PasswordValidatorTest {
    private ConstraintValidatorContext context;
    private PasswordValidator validator;

    @BeforeEach
    void setUp() {
        validator = new PasswordValidator();
        context = mock(ConstraintValidatorContext.class);
        ConstraintValidatorContext.ConstraintViolationBuilder builder =
                mock(ConstraintValidatorContext.ConstraintViolationBuilder.class);
        when(context.buildConstraintViolationWithTemplate(anyString())).thenReturn(builder);
        when(builder.addConstraintViolation()).thenReturn(context);
    }

    @Test
    void testValidPhoneNumber() {
        assertTrue(validator.isValid("Qwerty1*", context));
    }

    @ParameterizedTest
    @ValueSource(strings = {"Qwer1*", "Qwerty1*Qwerty1*Qwerty1*Qwerty1*Qwerty1*Qwerty1*Qwerty1*Qwerty1*"})
    void testInvalidPasswordLength(String invalidPassword) {
        assertFalse(validator.isValid(invalidPassword, context));
        int minLengthPassword = 8;
        int maxLengthPassword = 50;
        String message = String.format("Password length should be between " +
                minLengthPassword + " and " + maxLengthPassword + " characters");
        verify(context).buildConstraintViolationWithTemplate(message);
    }

    @ParameterizedTest
    @ValueSource(strings = {"Password1", "password123", "Password!", "Pass word1"})
    void testInvalidPasswordPattern(String invalidPassword) {
        assertFalse(validator.isValid(invalidPassword, context));
        verify(context).buildConstraintViolationWithTemplate("Password must contain only lowercase, " +
                "uppercase latin letters, " +
                "numbers and special symbols !@#$%^&*()");
    }

    @Test
    void testNullPassword() {
        assertFalse(validator.isValid(null, context));
    }
}
