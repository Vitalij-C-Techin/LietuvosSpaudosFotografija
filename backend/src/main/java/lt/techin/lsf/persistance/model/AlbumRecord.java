package lt.techin.lsf.persistance.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "album")
public class AlbumRecord {
    @Id
    @Column(name = "uuid", nullable = false)
    private UUID uuid;

    @Column(name = "submission_uuid")
    private UUID albumUuid;

    @Column(name = "name_lt")
    private String nameLt;

    @Column(name = "name_en")
    private String nameEn;

    @Column(name = "description_lt")
    private String descriptionLt;

    @Column(name = "description_en")
    private String descriptionEn;

    @Column(name = "status")
    private String status;
}
