package lt.techin.lsf.model.requests;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

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
}
