package lt.techin.lsf.model.requests;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisterRequest {

    @NotNull
    @NotBlank
    @Size(min = 2, max = 50)
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
        if (name.length() < 2) {

        }

        if (name.length() > 50) {

        }


    }

    public void sanitizeData() {

    }

}
