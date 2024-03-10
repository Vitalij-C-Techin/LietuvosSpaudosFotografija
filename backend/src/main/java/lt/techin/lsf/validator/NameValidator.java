package lt.techin.lsf.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lt.techin.lsf.exception.UserRegistrationNameInvalidFormatException;
import lt.techin.lsf.exception.UserRegistrationNameIsTooLongException;
import lt.techin.lsf.exception.UserRegistrationNameIsTooShortException;

import java.util.regex.Pattern;

public class NameValidator implements ConstraintValidator<ValidNameConstraint, String> {
    private static final int MIN_NAME_LENGTH = 2;
    private static final int MAX_NAME_LENGTH = 50;
    private static final String NAME_PATTERN = "^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ]+$";

    @Override
    public boolean isValid(String name, ConstraintValidatorContext context) {
        if (name == null) {
            return false; // or throw exception as per your requirement
        }

        if (name.length() < MIN_NAME_LENGTH) {
            throw new UserRegistrationNameIsTooShortException("User name is too short");
        }

        if (name.length() > MAX_NAME_LENGTH) {
            throw new UserRegistrationNameIsTooLongException("User name is too long");
        }

        if (!Pattern.matches(NAME_PATTERN, name)) {
            throw new UserRegistrationNameInvalidFormatException("User Name invalid format");
        }

        return true;
    }
}
