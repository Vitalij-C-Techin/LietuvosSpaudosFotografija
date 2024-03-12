package lt.techin.lsf.validator;

import jakarta.validation.ConstraintValidatorContext;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;

class EmailValidatorTest {

    private EmailValidator emailValidator;
    private ConstraintValidatorContext constraintValidatorContext;
    @BeforeEach
    void setUp() {
        emailValidator = new EmailValidator();
        constraintValidatorContext = mock(ConstraintValidatorContext.class);
    }


    @Test
    void testValidEmail() {
        assertTrue(emailValidator.isValid("test@example.com", constraintValidatorContext));
        assertTrue(emailValidator.isValid("student@school.edu.com", constraintValidatorContext));
    }

    @Test
    void testInvalidEmail() {
        assertFalse(emailValidator.isValid("invalid-email", constraintValidatorContext));
        assertFalse(emailValidator.isValid("invalid-email@", constraintValidatorContext));
        assertFalse(emailValidator.isValid("invalid  email@", constraintValidatorContext));

    }

    @Test
    void testNullEmail() {
        assertFalse(emailValidator.isValid(null, constraintValidatorContext));
    }
}