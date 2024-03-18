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
@Table(name = "photo")
public class PhotoRecord {
    @Id
    @Column(name = "uuid", nullable = false)
    private UUID uuid;

    @Column(name = "album_uuid")
    private UUID albumUuid;

    @Column(name = "name_lt")
    private String nameLt;

    @Column(name = "name_en")
    private String nameEn;

    @Column(name = "description_lt")
    private String descriptionLt;

    @Column(name = "description_en")
    private String descriptionEn;

    @Column(name = "position")
    private int position;

    @Column(name = "status")
    private String status;
}
