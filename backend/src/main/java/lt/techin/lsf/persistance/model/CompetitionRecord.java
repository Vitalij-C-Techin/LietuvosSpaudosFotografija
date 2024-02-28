package lt.techin.lsf.persistance.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.sql.Timestamp;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "competition")
public class CompetitionRecord {
    @Id
    @Column(name = "uuid", nullable = false)
    private UUID uuid;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "name_en", nullable = false)
    private String nameEn;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "description_en", nullable = false)
    private String descriptionEn;

    @Column(name = "photo_limit", nullable = false)
    private String photoLimit;

    @Column(name = "start_date", nullable = false)
    private String startDate;

    @Column(name = "end_date", nullable = false)
    private String endDate;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Timestamp createdAt;

    @Column(name = "status")
    private String status;

    @Column(name = "visibility")
    private String visibility;

    public CompetitionRecord setupNewCompetition() {
        setGeneratedUuid();
        setCreatedAtNow();

        return this;
    }

    public CompetitionRecord setGeneratedUuid() {
        uuid = UUID.randomUUID();

        return this;
    }

    public CompetitionRecord setCreatedAtNow() {
        createdAt = new Timestamp(System.currentTimeMillis());

        return this;
    }

}
