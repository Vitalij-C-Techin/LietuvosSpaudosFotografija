package lt.techin.lsf.model.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import lt.techin.lsf.model.User;

import java.sql.Timestamp;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponse {
    private UUID uuid;

    private String name;

    private String surname;

    @JsonProperty("birth_year")
    private int birthYear;

    @JsonProperty("phone_number")
    private String phoneNumber;

    private String email;

    @JsonProperty("media_name")
    private String mediaName;

    private User.Role role;

    @JsonProperty("is_active")
    private boolean isActive;

    @JsonProperty("created_at")
    private Timestamp createdAt;
}
