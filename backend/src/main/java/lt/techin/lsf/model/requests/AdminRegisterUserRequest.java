package lt.techin.lsf.model.requests;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lt.techin.lsf.model.User;
import lt.techin.lsf.validator.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AdminRegisterUserRequest {

    @ValidNameConstraint
    private String name;

    @ValidSurnameConstraint
    private String surname;

    @ValidBirthYearConstraint
    @JsonProperty("birth_year")
    private Integer birthYear;

    @ValidPhoneNumberConstraint
    @JsonProperty("phone_number")
    private String phoneNumber;

    @ValidEmailConstraint
    private String email;

    @ValidPasswordConstraint
    private String password;

    @ValidMediaNameConstraint
    @JsonProperty("media_name")
    private String mediaName;

    @NotNull
    private User.Role role;
}
