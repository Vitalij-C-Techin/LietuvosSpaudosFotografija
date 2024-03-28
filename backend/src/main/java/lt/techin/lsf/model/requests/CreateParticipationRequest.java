package lt.techin.lsf.model.requests;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateParticipationRequest {
    @NotBlank(message = "Field cannot be empty")
    @JsonProperty("user_uuid")
    private UUID userUuid;

    @NotBlank(message = "Field cannot be empty")
    @JsonProperty("competition_uuid")
    private UUID competitionUuid;
}
