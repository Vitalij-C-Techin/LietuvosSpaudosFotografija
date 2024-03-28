package lt.techin.lsf.persistance.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "category")
public class CategoryRecord {

    @Id
    @Column(name = "uuid", nullable = false)
    private UUID uuid;

    @Column(name = "name_lt", nullable = false)
    private String nameLt;

    @Column(name = "name_en", nullable = false)
    private String nameEn;

    @Column(name = "description_lt", nullable = false)
    private String descriptionLt;

    @Column(name = "description_en", nullable = false)
    private String descriptionEn;

    @Column(name = "album_type", nullable = false)
    private String albumType;

    @Column(name = "photo_limit", nullable = false)
    private int photoLimit;

    @Column(name = "is_preset")
    private String isPreset;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Timestamp createdAt;

    @JsonIgnore
    @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinColumn(name = "competition_uuid")
    private CompetitionRecord competitionRecord;

    public CategoryRecord setupNewCategory() {
        setGeneratedUuid();
        setCreatedAtNow();

        return this;
    }

    public CategoryRecord setGeneratedUuid() {
        uuid = UUID.randomUUID();

        return this;
    }

    public CategoryRecord setCreatedAtNow() {
        createdAt = new Timestamp(System.currentTimeMillis());

        return this;
    }
}
