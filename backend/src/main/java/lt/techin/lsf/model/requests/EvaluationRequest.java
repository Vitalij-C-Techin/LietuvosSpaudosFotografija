package lt.techin.lsf.model.requests;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class EvaluationRequest {

    @JsonProperty("jury_uuid")
    private UUID juryUuid;

    @JsonProperty("submission_uuid")
    private UUID submissionUuid;

    @JsonProperty("photo_uuid")
    private UUID photoUuid;

    @JsonProperty("album_uuid")
    private UUID albumUuid;

    @JsonProperty("liked")
    private boolean liked;
}
