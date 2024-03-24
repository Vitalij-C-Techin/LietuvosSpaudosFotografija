package lt.techin.lsf.model.requests;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
public class UpdatePhotoRequest {
    private UUID uuid;

    @JsonProperty("name_lt")
    private String nameLt;

    @JsonProperty("name_en")
    private String nameEn;

    @JsonProperty("description_lt")
    private String descriptionLt;

    @Column(name = "description_en")
    private String descriptionEn;

    private int position;

    private String stage;
}
