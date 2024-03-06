package lt.techin.lsf.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.time.LocalDate;

public class BirthYearValidator implements ConstraintValidator <ValidBirthYearConstraint, Integer> {

    @Override
    public boolean isValid(Integer birthYear, ConstraintValidatorContext constraintValidatorContext) {
        constraintValidatorContext.disableDefaultConstraintViolation();

        if (birthYear == null) {
            constraintValidatorContext.buildConstraintViolationWithTemplate("Field cannot be empty")
                    .addConstraintViolation();
            return false;
        }

        int currentYear = LocalDate.now().getYear();
        if (birthYear < 1900 || birthYear > currentYear) {
            constraintValidatorContext.buildConstraintViolationWithTemplate("Invalid birth year")
                    .addConstraintViolation();
            return false;
        }
        return true;
    }
}
