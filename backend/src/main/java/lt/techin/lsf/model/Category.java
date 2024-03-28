package lt.techin.lsf.model;

import lombok.*;

import java.util.UUID;

@Getter
@Setter
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
public class Category {
    private UUID uuid;
    private String nameLt;
    private String nameEn;
    private String descriptionLt;
    private String descriptionEn;
    private String albumType;
    private int photoLimit;
    private UUID competitionUuid;
}
