package lt.techin.lsf.model.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.springframework.core.env.Environment;

import java.util.UUID;

@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
public class PhotoRecordResponse {
    private UUID uuid;
    @JsonProperty("name")
    private String nameLt;
    @JsonProperty("name_en")
    private String nameEn;
    @JsonProperty("description")
    private String descriptionLt;
    @JsonProperty("description_en")
    private String descriptionEn;
    private int position;
    @JsonProperty("original")
    private String originalImgUrl;
    @JsonProperty("thumbnail")
    private String thumbnailImgUrl;


    public PhotoRecordResponse(UUID uuid, String nameLt, String nameEn, String descriptionLt, String descriptionEn, int position) {
        this.uuid = uuid;
        this.nameLt = nameLt;
        this.nameEn = nameEn;
        this.descriptionLt = descriptionLt;
        this.descriptionEn = descriptionEn;
        this.position = position;
        this.originalImgUrl = "http://localhost:8080/photo/" + uuid + ".jpeg";
        this.thumbnailImgUrl = "http://localhost:8080/photo/" + uuid + "-small.jpeg";
    }


}