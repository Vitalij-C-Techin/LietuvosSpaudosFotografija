package lt.techin.lsf.model.requests;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lt.techin.lsf.model.User;
import org.hibernate.validator.constraints.Length;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AdminRegisterUserRequest {

    @Length(min = 2, max = 50, message = "Name length should be between {min} and {max} characters")
    @Pattern(regexp = "^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ ]+$", message = "Name can contain only letters")
    private String name;

    @Length(min = 2, max = 50, message = "Surname length should be between {min} and {max} characters")
    @Pattern(regexp = "^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ ]+$", message = "Name can contain only letters")
    private String surname;

    @NotNull
    @Min(1904)
    @Max(2024)
    @JsonProperty("birth_year")
    private Integer birthYear;

    @Length(min = 6, max = 30, message = "Phone length should be between {min} and {max} characters")
    @Pattern(regexp = "^([+])?\\d+$", message = "Invalid phone format")
    @JsonProperty("phone_number")
    private String phoneNumber;

    @Pattern(regexp = "(?i)^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,4}$", message = "Invalid email format")
    private String email;

    @Length(min = 8, max = 50, message = "Password length should be between {min} and {max} characters")
    @Pattern(regexp = "^(?!.*\\s)(?=.*[A-Z])(?=.*\\d)(?=.*[a-z])(?=.*[!@#$%^&*()]).+$", message = "Password must contain only lowercase, " +
            "uppercase latin letters, numbers and special symbols !@#$%^&*()")
    private String password;

    @Length(max = 50, message = "media name length should be less than {max} characters")
    @JsonProperty("media_name")
    private String mediaName;

    @NotNull
    private User.Role role;
}
