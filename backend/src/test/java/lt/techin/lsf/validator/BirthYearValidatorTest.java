package lt.techin.lsf.validator;

import jakarta.validation.ConstraintValidatorContext;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

public class BirthYearValidatorTest {
    private BirthYearValidator birthYearValidator;
    private ConstraintValidatorContext constraintValidatorContext;

    @BeforeEach
    void setUp() {
        birthYearValidator = new BirthYearValidator();
        constraintValidatorContext = mock(ConstraintValidatorContext.class);
        ConstraintValidatorContext.ConstraintViolationBuilder builder =
                mock(ConstraintValidatorContext.ConstraintViolationBuilder.class);
        when(constraintValidatorContext.buildConstraintViolationWithTemplate(anyString())).thenReturn(builder);
    }

    @Test
    public void testValidBirthYear() {
        assertTrue(birthYearValidator.isValid(1990, constraintValidatorContext));
        assertTrue(birthYearValidator.isValid(1900, constraintValidatorContext));
        assertTrue(birthYearValidator.isValid(2021, constraintValidatorContext));
        assertTrue(birthYearValidator.isValid(2024, constraintValidatorContext));
    }

    @Test
    void testNullBirthYear() {
        assertFalse(birthYearValidator.isValid(null, constraintValidatorContext));
        verify(constraintValidatorContext).buildConstraintViolationWithTemplate("Field cannot be empty");
    }

    @Test
    void testInvalidBirthYear() {
        assertFalse(birthYearValidator.isValid(LocalDate.now().getYear() + 1, constraintValidatorContext));
        verify(constraintValidatorContext).buildConstraintViolationWithTemplate("Invalid birth year");
    }

    @ParameterizedTest
    @ValueSource(ints = {-1899, 10025, 0, 1000})
    void testInvalidBirthYear(int invalidBirthYear) {
        assertFalse(birthYearValidator.isValid(invalidBirthYear, constraintValidatorContext));
        verify(constraintValidatorContext).buildConstraintViolationWithTemplate("Invalid birth year");
    }
}