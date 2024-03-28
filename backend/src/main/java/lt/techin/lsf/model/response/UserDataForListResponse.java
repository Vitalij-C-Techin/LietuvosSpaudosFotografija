package lt.techin.lsf.model.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import lt.techin.lsf.model.User;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDataForListResponse {
    private UUID uuid;

    private String name;

    private String surname;

    private User.Role role;

    @JsonProperty("birth_year")
    private int birthYear;

    @JsonProperty("is_active")
    private boolean isActive;
}
