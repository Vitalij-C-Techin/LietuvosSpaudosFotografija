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

public class SurnameValidatorTest {

    private SurnameValidator validator;
    private ConstraintValidatorContext context;

    @BeforeEach
    void setUp() {
        validator = new SurnameValidator();
        context = mock(ConstraintValidatorContext.class);
        ConstraintValidatorContext.ConstraintViolationBuilder builder =
                mock(ConstraintValidatorContext.ConstraintViolationBuilder.class);
        when(context.buildConstraintViolationWithTemplate(anyString())).thenReturn(builder);
        when(builder.addConstraintViolation()).thenReturn(context);
    }

    @Test
    void testValidSurname() {
        assertTrue(validator.isValid("Doe", context));
    }

    @Test
    void testShortSurname() {
        assertFalse(validator.isValid("A", context));
        verify(context).buildConstraintViolationWithTemplate("Surname length should be between 2 and 50 characters");
    }

    @Test
    void testLongSurname() {
        assertFalse(validator.isValid("DoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoe", context));
        verify(context).buildConstraintViolationWithTemplate("Surname length should be between 2 and 50 characters");
    }

    @ParameterizedTest
    @ValueSource(strings = {"@Doe", "10025", "#T", "One1"})
    void testInvalidCharactersSurname(String invalidSurname) {
        assertFalse(validator.isValid(invalidSurname, context));
        verify(context).buildConstraintViolationWithTemplate("Surname can contain only letters");
    }


    @Test
    void testNullSurname() {
        assertFalse(validator.isValid(null, context));
    }
}

