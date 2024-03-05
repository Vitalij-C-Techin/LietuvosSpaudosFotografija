package lt.techin.lsf.model.requests;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lt.techin.lsf.model.ParticipationRequest;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateParticipationRequest {
    @JsonProperty("user_uuid")
    private UUID userUuid;

    @JsonProperty("competition_uuid")
    private UUID competitionUuid;

    private ParticipationRequest.Status status;
}
