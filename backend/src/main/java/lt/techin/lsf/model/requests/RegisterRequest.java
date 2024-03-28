package lt.techin.lsf.model.requests;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import lt.techin.lsf.validator.*;

import java.util.Locale;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisterRequest {

    @ValidNameConstraint
    private String name;

    @ValidSurnameConstraint
    private String surname;

    @ValidBirthYearConstraint
    @JsonProperty("birth_year")
    private int birthYear;

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

    public void sanitizeData() {
        if (null != email) {
            email = email
                    .toLowerCase(Locale.ROOT)
                    .replace(" ", "");
        }

    }
}
