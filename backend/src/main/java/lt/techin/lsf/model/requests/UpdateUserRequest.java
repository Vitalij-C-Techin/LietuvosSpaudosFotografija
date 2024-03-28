package lt.techin.lsf.model.requests;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lt.techin.lsf.validator.*;

@Getter
@Setter
@AllArgsConstructor
public class UpdateUserRequest {

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

    @ValidMediaNameConstraint
    @JsonProperty("media_name")
    private String mediaName;

}
