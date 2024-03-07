package lt.techin.lsf.validator;

import jakarta.validation.ConstraintValidatorContext;
import lt.techin.lsf.exception.UserRegistrationPhoneNumberInvalidFormatException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

class PhoneNumberValidatorTest {


    private ConstraintValidatorContext constraintValidatorContext;

    private final PhoneNumberValidator phoneNumberValidator = new PhoneNumberValidator();

    @Test
    void testValidPhoneNumber() {
        assertTrue(phoneNumberValidator.isValid("+1234567890", constraintValidatorContext));
    }

    @ParameterizedTest
    @ValueSource(strings = {"112", "abcdef", "+123456789012345678901234567890"})
    void testInvalidPhoneNumber(String phoneNumber) {
        assertThrows(UserRegistrationPhoneNumberInvalidFormatException.class,
                () -> phoneNumberValidator.isValid(phoneNumber, constraintValidatorContext));
    }

    @Test
    void testNullPhoneNumber() {
        assertThrows(UserRegistrationPhoneNumberInvalidFormatException.class,
                () -> phoneNumberValidator.isValid(null, constraintValidatorContext));
    }
}
