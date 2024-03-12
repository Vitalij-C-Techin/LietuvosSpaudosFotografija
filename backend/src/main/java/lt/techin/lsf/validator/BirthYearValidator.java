package lt.techin.lsf.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.time.LocalDate;

public class BirthYearValidator implements ConstraintValidator<ValidBirthYearConstraint, Integer> {
    private static final int MIN_BIRTH_YEAR = LocalDate.now().minusYears(120).getYear();

    @Override
    public boolean isValid(Integer birthYear, ConstraintValidatorContext context) {
        context.disableDefaultConstraintViolation();

        if (birthYear == null) {
            context.buildConstraintViolationWithTemplate("Field cannot be empty")
                    .addConstraintViolation();
            return false;
        }

        int currentYear = LocalDate.now().getYear();
        if (birthYear < MIN_BIRTH_YEAR || birthYear > currentYear) {
            String message = String.format("Birth year should be between %d and %d years", MIN_BIRTH_YEAR, currentYear);
            context.buildConstraintViolationWithTemplate(message)
                    .addConstraintViolation();
            return false;
        }
        return true;
    }
}

