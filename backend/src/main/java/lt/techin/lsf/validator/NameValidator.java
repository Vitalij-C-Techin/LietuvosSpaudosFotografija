package lt.techin.lsf.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.regex.Pattern;

public class NameValidator implements ConstraintValidator<ValidNameConstraint, String> {
    private static final int MIN_NAME_LENGTH = 2;
    private static final int MAX_NAME_LENGTH = 50;
    private static final String NAME_PATTERN = "^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ]+$";

    @Override
    public boolean isValid(String name, ConstraintValidatorContext context) {
        if (name == null || name.trim().isEmpty()) {
            return false;
        }

        if (name.length() < MIN_NAME_LENGTH || name.length() > MAX_NAME_LENGTH) {
            context.disableDefaultConstraintViolation();
            String message = String.format("Name length should be between %d and %d characters", MIN_NAME_LENGTH,
                    MAX_NAME_LENGTH);
            context.buildConstraintViolationWithTemplate(message)
                    .addConstraintViolation();
            return false;
        }

        if (!Pattern.matches(NAME_PATTERN, name)) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("Name can contain only letters")
                    .addConstraintViolation();
            return false;
        }

        return true;
    }
}
