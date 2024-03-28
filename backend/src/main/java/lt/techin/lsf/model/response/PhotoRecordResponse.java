package lt.techin.lsf.model.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
public class PhotoRecordResponse {
    private UUID uuid;
    @JsonProperty("name_lt")
    private String nameLt;
    @JsonProperty("name_en")
    private String nameEn;
    @JsonProperty("description_lt")
    private String descriptionLt;
    @JsonProperty("description_en")
    private String descriptionEn;
    private int position;
    @JsonProperty("submission_id")
    private UUID submissionUuid;



}