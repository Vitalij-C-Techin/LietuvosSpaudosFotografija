package lt.techin.lsf.model.requests;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateParticipationRequest {
    @JsonProperty("user_uuid")
    private UUID userUuid;

    @JsonProperty("competition_uuid")
    private UUID competitionUuid;
}
