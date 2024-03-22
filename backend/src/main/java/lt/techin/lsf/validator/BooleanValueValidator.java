package lt.techin.lsf.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class BooleanValueValidator implements ConstraintValidator<ValidBooleanValueConstraint, Boolean> {

    @Override
    public boolean isValid(Boolean value, ConstraintValidatorContext context) {

        if (value == null) {
            return false;
        }

        String stringValue = value.toString().toLowerCase();
        return stringValue.equals("true") || stringValue.equals("false");
    }
}
