package lt.techin.lsf.validator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = MediaNameValidator.class)
@Target({ElementType.FIELD, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidMediaNameConstraint {

    String message() default "Media name must be less than 50 characters long";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}

