package lt.techin.lsf.model.requests;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import lt.techin.lsf.model.Competition;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateCompetitionRequest {
    @JsonProperty("name_lt")
    public String nameLt;
    @JsonProperty("name_en")
    public String nameEn;

    @JsonProperty("description_lt")
    public String descriptionLt;
    @JsonProperty("Description_en")
    public String descriptionEn;

    @JsonProperty("photo_limit")
    public int photoLimit;

    @JsonProperty("start_date")
    public LocalDateTime startDate;
    @JsonProperty("end_date")
    public LocalDateTime endDate;

    public Competition.Status status;
    public Competition.Visibility visibility;
}
