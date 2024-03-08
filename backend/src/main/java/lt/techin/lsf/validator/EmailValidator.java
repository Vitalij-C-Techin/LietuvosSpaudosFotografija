package lt.techin.lsf.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lt.techin.lsf.exception.UserRegistrationEmailInvalidFormatException;

import java.util.regex.Pattern;

public class EmailValidator implements ConstraintValidator<ValidEmailConstraint, String> {
    private static final String EMAIL_PATTERN = "^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,4}$";

    @Override
    public boolean isValid(String email, ConstraintValidatorContext context) {
        if (email == null) {
            throw new UserRegistrationEmailInvalidFormatException("Email invalid format");
        }

        if (!Pattern.compile(EMAIL_PATTERN, Pattern.CASE_INSENSITIVE).matcher(email).matches()) {
            throw new UserRegistrationEmailInvalidFormatException("Email invalid format");
        }

        return true;
    }
}

