package lt.techin.lsf.model.requests;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

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

    @Min(value = 1900, message = "Birth year must be after 1900")
    @Max(value = 2024, message = "Birth year must be before 2024")
    @JsonProperty("birthYear")
    private int birthYear;

    @NotBlank (message = "Field cannot be empty")
    @JsonProperty("phoneNumber")
    private String phoneNumber;

    @NotBlank (message = "Field cannot be empty")
    @JsonProperty("email")
    private String email;

    @NotBlank (message = "Field cannot be empty")
    @JsonProperty("mediaName")
    private String mediaName;

}
