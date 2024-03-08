package lt.techin.lsf.validator;

import lt.techin.lsf.exception.UserRegistrationSurnameInvalidFormatException;
import lt.techin.lsf.exception.UserRegistrationSurnameIsTooLongException;
import lt.techin.lsf.exception.UserRegistrationSurnameIsTooShortException;
import org.junit.jupiter.api.Test;
import jakarta.validation.ConstraintValidatorContext;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;

public class SurnameValidatorTest {

    private final SurnameValidator validator = new SurnameValidator();
    private final ConstraintValidatorContext context = mock(ConstraintValidatorContext.class);

    @Test
    void testValidSurname() {
        assertTrue(validator.isValid("Doe", context));
    }

    @Test
    void testShortSurname() {
        assertThrows(UserRegistrationSurnameIsTooShortException.class,
                () -> validator.isValid("A", context));
    }

    @Test
    void testLongSurname() {
        assertThrows(UserRegistrationSurnameIsTooLongException.class,
                () -> validator.isValid("DoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoe", context));
    }

    @ParameterizedTest
    @ValueSource(strings = {"@Doe", "10025", "#T", "One1"})
    void testInvalidCharactersSurname(String invalidSurname) {
        assertThrows(UserRegistrationSurnameInvalidFormatException.class,
                () -> validator.isValid(invalidSurname, context));
    }


    @Test
    void testNullSurname() {
        assertFalse(validator.isValid(null, context));
    }
}

