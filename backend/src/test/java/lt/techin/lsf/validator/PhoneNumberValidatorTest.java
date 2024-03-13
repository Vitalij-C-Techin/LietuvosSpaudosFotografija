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

class PhoneNumberValidatorTest {
    private ConstraintValidatorContext context;
    private PhoneNumberValidator validator;

    @BeforeEach
    void setUp() {
        validator = new PhoneNumberValidator();
        context = mock(ConstraintValidatorContext.class);
        ConstraintValidatorContext.ConstraintViolationBuilder builder =
                mock(ConstraintValidatorContext.ConstraintViolationBuilder.class);
        when(context.buildConstraintViolationWithTemplate(anyString())).thenReturn(builder);
        when(builder.addConstraintViolation()).thenReturn(context);
    }

    @Test
    void testValidPhoneNumber() {
        assertTrue(validator.isValid("+1234567890", context));
    }

    @ParameterizedTest
    @ValueSource(strings = {"+112", "+123456789012345678901234567890"})
    void testInvalidPhoneNumber(String phoneNumber) {
        assertFalse(validator.isValid(phoneNumber, context));
        verify(context).buildConstraintViolationWithTemplate("Phone number is too short or to long");
    }

    @ParameterizedTest
    @ValueSource(strings = {"112233444", "abcvwwwwwwaan", "12334557abc", "1+23645798722"})
    void testInvalidPhoneNumberPattern(String phoneNumber) {
        assertFalse(validator.isValid(phoneNumber, context));
        verify(context).buildConstraintViolationWithTemplate("Phone number invalid format");
    }

    @Test
    void testNullPhoneNumber() {
        assertFalse(validator.isValid(null, context));
    }
}
