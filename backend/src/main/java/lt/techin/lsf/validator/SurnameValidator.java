package lt.techin.lsf.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.regex.Pattern;

public class SurnameValidator implements ConstraintValidator<ValidSurnameConstraint, String> {

    private static final int MIN_LENGTH = 2;
    private static final int MAX_LENGTH = 50;
    private static final Pattern VALID_CHARACTERS = Pattern.compile("^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ]+$");

    @Override
    public boolean isValid(String surname, ConstraintValidatorContext context) {
        if (surname == null || surname.trim().isEmpty()) {
            return false;
        }

        if (surname.length() < MIN_LENGTH || surname.length() > MAX_LENGTH) {
            context.disableDefaultConstraintViolation();
            String message = String.format("Surname length should be between %d and %d characters", MIN_LENGTH, MAX_LENGTH);
            context.buildConstraintViolationWithTemplate(message)
                    .addConstraintViolation();
            return false;
        }

        if (!VALID_CHARACTERS.matcher(surname).matches()) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("Surname can contain only letters")
                    .addConstraintViolation();
            return false;
        }

        return true;
    }
}

