package lt.techin.lsf.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class MediaNameValidator implements ConstraintValidator<ValidMediaNameConstraint, String> {
    private static final int MAX_MEDIA_NAME_LENGTH = 50;

    @Override
    public boolean isValid(String mediaName, ConstraintValidatorContext context) {

        if (mediaName == null || mediaName.trim().isEmpty()) {
            return true;
        }

        return mediaName.length() <= MAX_MEDIA_NAME_LENGTH;
    }
}
