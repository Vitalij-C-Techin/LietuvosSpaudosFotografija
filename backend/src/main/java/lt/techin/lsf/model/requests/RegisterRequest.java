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

        if (!Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,4}$", Pattern.CASE_INSENSITIVE).matcher(email).matches()) {
            throw new UserRegistrationEmailInvalidFormatException("Email invalid format");
        }

        // Password

        if (password.length() < 8) {
            throw new UserRegistrationPasswordIsTooShortException("Password is too short");
        }

        if (password.length() > 50) {
            throw new UserRegistrationPasswordIsTooLongException("Password is too long");
        }

        if (!Pattern.matches("^(?!.*\\s)(?=.*[A-Z])(?=.*\\d)(?=.*[a-z])(?=.*[!@#$%^&*()]).+$", password)) {
            throw new UserRegistrationPasswordFormatException("Password must contain only lowercase, " +
                    "uppercase latin letters, numbers and special symbols !@#$%^&*()");
        }

        // Name

        if (name.length() < 2) {
            throw new UserRegistrationNameIsTooShortException("User name is too short");
        }

        if (name.length() > 50) {
            throw new UserRegistrationNameIsTooLongException("User name is too long");
        }

        if (!Pattern.matches("^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ]+$", name)) {
            throw new UserRegistrationNameInvalidFormatException("User Name invalid format");
        }

        // Surname

        if (surname.length() < 2) {
            throw new UserRegistrationSurnameIsTooShortException("User surname is too short");
        }

        if (surname.length() > 50) {
            throw new UserRegistrationSurnameIsTooLongException("User surname is too long");
        }

        if (!Pattern.matches("^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ]+$", surname)) {
            throw new UserRegistrationSurnameInvalidFormatException("Name invalid format");
        }

        // Birth Year

        int currentYear = LocalDate.now().getYear();

        if (currentYear - 120 > birthYear) {
            throw new UserRegistrationTooOldException("User is too old");
        }

        if (currentYear - 18 < birthYear) {
            throw new UserRegistrationTooYoungException("User is too young");
        }

        //Phone Number

        if (phoneNumber.length() < 6) {
            throw new UserRegistrationPhoneNumberInvalidFormatException("Phone number too short");
        }

        if (phoneNumber.length() > 30) {
            throw new UserRegistrationPhoneNumberInvalidFormatException("Phone number too long");
        }

        if (!Pattern.matches("^([+])?\\d+$", phoneNumber)) {
            throw new UserRegistrationPhoneNumberInvalidFormatException("Phone number invalid format");
        }

        //Media Name

        if (mediaName.length() > 50) {
            throw new UserRegistrationMediaNameIsTooLongException("Media name is too long");
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
