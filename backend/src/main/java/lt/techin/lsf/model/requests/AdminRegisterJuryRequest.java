package lt.techin.lsf.model.requests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AdminRegisterJuryRequest {

    @NotBlank
    @Length(min = 2, max = 50, message = "name length should be between {min} and {max} characters")
    @Pattern(regexp = "^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ ]+$", message = "Name can contain only letters")
    private String name;

    @NotBlank
    @Length(min = 2, max = 50, message = "surname length should be between {min} and {max} characters")
    @Pattern(regexp = "^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ ]+$", message = "Name can contain only letters")
    private String surname;

    @NotBlank
    @Pattern(regexp = "(?i)^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,4}$", message = "Invalid email format")
    private String email;

    @NotBlank
    @Length(min = 8, max = 50, message = "surname length should be between {min} and {max} characters")
    @Pattern(regexp = "^(?!.*\\s)(?=.*[A-Z])(?=.*\\d)(?=.*[a-z])(?=.*[!@#$%^&*()]).+$", message = "Password must contain only lowercase, " +
            "uppercase latin letters, numbers and special symbols !@#$%^&*()")
    private String password;

}
