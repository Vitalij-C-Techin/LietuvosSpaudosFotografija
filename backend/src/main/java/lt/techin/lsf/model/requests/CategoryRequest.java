package lt.techin.lsf.model.requests;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class CategoryRequest {

    @NotBlank (message = "Field cannot be empty")
    @JsonProperty("category_name_lt")
    private String categoryNameLt;

    @NotBlank(message = "Field cannot be empty")
    @JsonProperty("category_name_en")
    private String categoryNameEn;

    @NotBlank (message = "Field cannot be empty")
    @JsonProperty("category_description_lt")
    private  String categoryDescriptionLt;

    @NotBlank(message = "Field cannot be empty")
    @JsonProperty("category_description_en")
    private String categoryDescriptionEn;

    @NotBlank(message = "Field cannot be empty")
    @JsonProperty("album_type")
    private String albumType;

    @Min(value = 1, message = "Minimum limit is {value} photo")
    @Max(value = 50, message = "Maximum limit is {value} photos")
    @JsonProperty("photo_limit")
    private int photoLimit;
}
