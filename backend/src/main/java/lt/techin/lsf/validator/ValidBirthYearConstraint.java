package lt.techin.lsf.validator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = BirthYearValidator.class)
@Target({ElementType.FIELD, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidBirthYearConstraint {

    String message() default "Invalid birth year";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};

}
