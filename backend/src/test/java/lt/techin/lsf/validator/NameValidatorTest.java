package lt.techin.lsf.validator;

import jakarta.validation.ConstraintValidatorContext;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;

class NameValidatorTest {

    private NameValidator validator;
    private ConstraintValidatorContext context;

    @BeforeEach
    void setUp() {
        validator = new NameValidator();
        context = mock(ConstraintValidatorContext.class);
        ConstraintValidatorContext.ConstraintViolationBuilder builder =
                mock(ConstraintValidatorContext.ConstraintViolationBuilder.class);
        when(context.buildConstraintViolationWithTemplate(anyString())).thenReturn(builder);
        when(builder.addConstraintViolation()).thenReturn(context);
    }

    @Test
    void testValidName() {
        assertTrue(validator.isValid("John", context));
    }

    @Test
    void testShortName() {
        assertFalse(validator.isValid("A", context));
        verify(context).buildConstraintViolationWithTemplate("Name length should be between 2 and 50 characters");
    }

    @Test
    void testLongName() {
        assertFalse(validator.isValid("JohnDoeJohnDoeJohnDoeJohnDoeJohnDoeJohnDoeJohnDoeJohnDoeJohnDoeJohnDoeJohnDoeJohnDoeJohnDoeJohnDoe", context));
        verify(context).buildConstraintViolationWithTemplate("Name length should be between 2 and 50 characters");
    }

    @ParameterizedTest
    @ValueSource(strings = {"@John", "10025", "#J", "One1"})
    void testInvalidCharactersName(String invalidName) {
        assertFalse(validator.isValid(invalidName, context));
        verify(context).buildConstraintViolationWithTemplate("Name can contain only letters");
    }

    @Test
    void testNullName() {
        assertFalse(validator.isValid(null, context));
    }
}
