package lt.techin.lsf.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lt.techin.lsf.exception.UserRegistrationSurnameInvalidFormatException;
import lt.techin.lsf.exception.UserRegistrationSurnameIsTooLongException;
import lt.techin.lsf.exception.UserRegistrationSurnameIsTooShortException;

import java.util.regex.Pattern;

public class SurnameValidator implements ConstraintValidator<ValidSurnameConstraint, String> {

    private static final int MIN_LENGTH = 2;
    private static final int MAX_LENGTH = 50;
    private static final Pattern VALID_CHARACTERS = Pattern.compile("^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ]+$");

    @Override
    public boolean isValid(String surname, ConstraintValidatorContext context) {
        if (surname == null) {
            return false;
        }

        if (surname.length() < MIN_LENGTH) {
            throw new UserRegistrationSurnameIsTooShortException("User surname is too short");
        }

        if (surname.length() > MAX_LENGTH) {
            throw new UserRegistrationSurnameIsTooLongException("User surname is too long");
        }

        if (!VALID_CHARACTERS.matcher(surname).matches()) {
            throw new UserRegistrationSurnameInvalidFormatException("Surname invalid format");
        }

        return true;
    }
}

