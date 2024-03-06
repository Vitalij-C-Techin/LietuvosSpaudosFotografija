package lt.techin.lsf.model.requests;


import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lt.techin.lsf.model.Competition;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateCompetitionRequest {
    @NotBlank(message = "Field cannot be empty")
    @JsonProperty("name_lt")
    public String nameLt;

    @NotBlank (message = "Field cannot be empty")
    @JsonProperty("name_en")
    public String nameEn;

    @NotBlank (message = "Field cannot be empty")
    @JsonProperty("description_lt")
    public String descriptionLt;

    @NotBlank (message = "Field cannot be empty")
    @JsonProperty("description_en")
    public String descriptionEn;

    @Min(value = 1, message = "Minimum limit is {value} photo")
    @Max(value = 50, message = "Maximum limit is {value} photos")
    @JsonProperty("photo_limit")
    public int photoLimit;

    @JsonProperty("start_date")
    public LocalDateTime startDate;

    @NotBlank(message = "Field cannot be empty")
    @JsonProperty("end_date")
    public LocalDateTime endDate;

    @NotBlank(message = "Field cannot be empty")
    public Competition.Status status;

    @NotBlank(message = "Field cannot be empty")
    public Competition.Visibility visibility;
}
