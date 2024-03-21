package lt.techin.lsf.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.UUID;

@Getter
@Builder
@AllArgsConstructor
public class Category {
    private UUID uuid;
    private String nameLt;
    private String nameEn;
    private String descriptionLt;
    private String descriptionEn;
    private String albumType;
    private int photoLimit;
    private String isPreset;
    private UUID competitionUuid;
}
