package lt.techin.lsf.model.requests;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import lt.techin.lsf.exception.*;

import java.time.LocalDate;
import java.util.Locale;
import java.util.regex.Pattern;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisterRequest {
    private String name;

    private String surname;

    @JsonProperty("birth_year")
    private int birthYear;

    @JsonProperty("phone_number")
    private String phoneNumber;

    private String email;

    private String password;

    @JsonProperty("media_name")
    private String mediaName;

    public void validateData() {

        if (null == email) {
            throw new UserRegistrationException("Email not found");
        }

        if (null == password) {
            throw new UserRegistrationException("Password not found");
        }

        if (null == name) {
            throw new UserRegistrationException("Name not found");
        }

        if (null == surname) {
            throw new UserRegistrationException("Surname not found");
        }

        if (null == phoneNumber) {
            throw new UserRegistrationException("Phone number not found");
        }

        // Email

        if (email.length() < 5) {
            throw new UserEmailIsTooShortException("User email is too short");
        }

        if (email.length() > 30) {
            throw new UserEmailIsTooLongException("User email is too long");
        }

        if (!Pattern.matches("^[a-zA-Z0-9.]+[@][a-zA-Z0-9]+[.][a-zA-Z]+$", email)) {
            throw new UserEmailInvalidFormatException("Email invalid format");
        }

        // Password

        if (password.length() < 8) {
            throw new UserPasswordIsTooShortException("User password is too short");
        }

        if (password.length() > 50) {
            throw new UserEmailIsTooLongException("User password is too long");
        }

        if (!Pattern.matches(".*[a-z].*", password)) {
            throw new UserPasswordLowercaseException("Password must contain lowercase letters");
        }

        if (!Pattern.matches(".*[A-Z].*", password)) {
            throw new UserPasswordUppercaseException("Password must contain uppercase letters");
        }

        if (!Pattern.matches(".*[0-9].*", password)) {
            throw new UserPasswordDigitException("Password must contain digits");
        }

        // Name

        if (name.length() < 3) {
            throw new UserNameIsTooShortException("User name is too short");
        }

        if (name.length() > 50) {
            throw new UserNameIsTooLongException("User name is too long");
        }

        if (!Pattern.matches("^[a-zA-Z]+$", name)) {
            throw new UserNameInvalidFormatException("User Name invalid format");
        }

        // Surname

        if (surname.length() < 3) {
            throw new UserSurnameIsTooShortException("User name is too short");
        }

        if (surname.length() > 50) {
            throw new UserSurnameIsTooLongException("User name is too long");
        }

        if (!Pattern.matches("^[a-zA-Z]+$", surname)) {
            throw new UserSurnameInvalidFormatException("Name invalid format");
        }

        // Birth Year

        int currentYear = LocalDate.now().getYear();

        if (currentYear - 100 > birthYear) {
            throw new UserIsTooOldException("User is too old");
        }

        if (currentYear - 18 < birthYear) {
            throw new UserIsTooYoungException("User is too young");
        }

        //Phone Number

        if (phoneNumber.length() < 3) {
            throw new UserPhoneNumberInvalidFormatException("Phone number too short");
        }

        if (phoneNumber.length() > 30) {
            throw new UserPhoneNumberInvalidFormatException("Phone number too long");
        }

        if (!Pattern.matches("^([+])?\\d+$", phoneNumber)) {
            throw new UserPhoneNumberInvalidFormatException("Phone number invalid format");
        }
    }

    public void sanitizeData() {
        if (null != email) {
            email = email
                    .toLowerCase(Locale.ROOT)
                    .replace(" ", "");
        }

    }
}
