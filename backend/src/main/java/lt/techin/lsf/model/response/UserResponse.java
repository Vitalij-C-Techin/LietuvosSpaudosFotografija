package lt.techin.lsf.model.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lt.techin.lsf.model.User;

import java.sql.Timestamp;
import java.util.UUID;

@Getter
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

    @JsonProperty("created_at")
    private Timestamp createdAt;
}
