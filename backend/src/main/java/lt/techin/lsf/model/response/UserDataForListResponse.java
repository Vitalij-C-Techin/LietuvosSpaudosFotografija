package lt.techin.lsf.model.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDataForListResponse {
    private String name;

    private String surname;

    private String email;

    @JsonProperty("birth_year")
    private int birthYear;
}
