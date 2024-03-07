package lt.techin.lsf.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lt.techin.lsf.exception.UserRegistrationPhoneNumberInvalidFormatException;

import java.util.regex.Pattern;

public class PhoneNumberValidator implements ConstraintValidator<ValidPhoneNumberConstraint, String> {

    private static final int MIN_LENGTH = 8;
    private static final int MAX_LENGTH = 30;
    private static final String PHONE_NUMBER_PATTERN = "^([+])?\\d+$";
    @Override
    public boolean isValid(String phoneNumber, ConstraintValidatorContext context) {
        if (phoneNumber == null) {
            throw new UserRegistrationPhoneNumberInvalidFormatException("Phone number not found");
        }

        if (!Pattern.matches(PHONE_NUMBER_PATTERN, phoneNumber)) {
            throw new UserRegistrationPhoneNumberInvalidFormatException("Phone number invalid format");
        }

        if (phoneNumber.length() < MIN_LENGTH) {
            throw new UserRegistrationPhoneNumberInvalidFormatException("Phone number too short");
        }

        if (phoneNumber.length() > MAX_LENGTH) {
            throw new UserRegistrationPhoneNumberInvalidFormatException("Phone number too long");
        }


        return true;
    }
}
