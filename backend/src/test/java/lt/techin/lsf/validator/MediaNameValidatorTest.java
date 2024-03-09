package lt.techin.lsf.validator;

import jakarta.validation.ConstraintValidatorContext;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;

@SpringBootTest
class MediaNameValidatorTest {


    private final MediaNameValidator validator = new MediaNameValidator();

    private final ConstraintValidatorContext context = mock(ConstraintValidatorContext.class);

    @Test
    void testValidMediaName() {
        assertTrue(validator.isValid("Sample Media", context));
    }

    @Test
    void testMediaNameTooLong() {
        assertFalse(validator.isValid("ThisIsAReallyLongMediaNameThatExceedsTheMaximumLengthAllowed", context));
    }
}