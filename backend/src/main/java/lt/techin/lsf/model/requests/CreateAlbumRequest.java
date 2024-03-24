package lt.techin.lsf.model.requests;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
@Builder
public class CreateAlbumRequest {
    @JsonProperty("submission_uuid")
    private UUID submissionUuid;

    @JsonProperty("name_lt")
    private String nameLt;

    @JsonProperty("name_en")
    private String nameEn;

    @JsonProperty("description_lt")
    private String descriptionLt;

    @JsonProperty("description_en")
    private String descriptionEn;

    private String type;

    private String status;
}
