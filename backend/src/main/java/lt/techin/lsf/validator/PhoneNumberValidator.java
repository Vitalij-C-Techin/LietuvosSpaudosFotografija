package lt.techin.lsf.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.regex.Pattern;

public class PhoneNumberValidator implements ConstraintValidator<ValidPhoneNumberConstraint, String> {

    private static final int MIN_LENGTH = 6;
    private static final int MAX_LENGTH = 30;
    private static final String PHONE_NUMBER_PATTERN = "^\\+\\d+$";

    @Override
    public boolean isValid(String phoneNumber, ConstraintValidatorContext context) {
        if (phoneNumber == null) {
            return false;
        }

        if (phoneNumber.length() < MIN_LENGTH || phoneNumber.length() > MAX_LENGTH) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("Phone number is too short or to long")
                    .addConstraintViolation();
            return false;
        }

        if (!Pattern.matches(PHONE_NUMBER_PATTERN, phoneNumber)) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("Phone number invalid format")
                    .addConstraintViolation();
            return false;
        }

        return true;
    }
}
