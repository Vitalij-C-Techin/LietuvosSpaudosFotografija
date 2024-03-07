package lt.techin.lsf.validator;

import jakarta.validation.ConstraintValidatorContext;
import lt.techin.lsf.exception.UserRegistrationNameInvalidFormatException;
import lt.techin.lsf.exception.UserRegistrationNameIsTooLongException;
import lt.techin.lsf.exception.UserRegistrationNameIsTooShortException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;

class NameValidatorTest {

    private final NameValidator validator = new NameValidator();
    private final ConstraintValidatorContext context = mock(ConstraintValidatorContext.class);

    @Test
    void testValidName() {
        assertTrue(validator.isValid("John", context));
    }

    @Test
    void testShortName() {
        assertThrows(UserRegistrationNameIsTooShortException.class,
                () -> validator.isValid("A", context));
    }

    @Test
    void testLongName() {
        assertThrows(UserRegistrationNameIsTooLongException.class,
                () -> validator.isValid("JohnDoeJohnDoeJohnDoeJohnDoeJohnDoeJohnDoeJohnDoeJohnDoeJohnDoeJohnDoeJohnDoeJohnDoeJohnDoeJohnDoe", context));
    }

    @ParameterizedTest
    @ValueSource(strings = {"@John", "10025", "#J", "One1"})
    void testInvalidCharactersName(String invalidName) {
        assertThrows(UserRegistrationNameInvalidFormatException.class,
                () -> validator.isValid(invalidName, context));
    }

    @Test
    void testNullName() {
        assertFalse(validator.isValid(null, context));
    }
}
