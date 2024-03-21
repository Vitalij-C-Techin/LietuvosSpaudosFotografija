package lt.techin.lsf.validator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = {BooleanValueValidator.class})
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidBooleanValueConstraint {
    String message() default "Field must hold value 'true' or 'false'";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
