package lt.techin.lsf.model.requests;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lt.techin.lsf.validator.ValidBirthYearConstraint;

@Getter
@Setter
@AllArgsConstructor
public class UpdateUserRequest {

    @NotBlank(message = "Field cannot be empty")
    @JsonProperty("name")
    private String name;

    @NotBlank (message = "Field cannot be empty")
    @JsonProperty("surname")
    private String surname;

    @ValidBirthYearConstraint
    @JsonProperty("birth_year")
    private Integer birthYear;

    @NotBlank (message = "Field cannot be empty")
    @JsonProperty("phone_number")
    private String phoneNumber;

    @NotBlank (message = "Field cannot be empty")
    @JsonProperty("email")
    private String email;

    @NotBlank (message = "Field cannot be empty")
    @JsonProperty("media_name")
    private String mediaName;

}
