package lt.techin.lsf.persistance.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lt.techin.lsf.model.Competition;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static jakarta.persistence.EnumType.STRING;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "competition")
public class CompetitionRecord {
    @Id
    @Column(name = "uuid", nullable = false)
    private UUID uuid;

    @JsonProperty("name_lt")
    @Column(name = "name_lt", nullable = false)
    private String nameLt;

    @JsonProperty("name_en")
    @Column(name = "name_en", nullable = false)
    private String nameEn;

    @JsonProperty("description_lt")
    @Column(name = "description_lt", nullable = false)
    private String descriptionLt;

    @JsonProperty("description_en")
    @Column(name = "description_en", nullable = false)
    private String descriptionEn;

    @JsonProperty("photo_limit")
    @Column(name = "photo_limit", nullable = false)
    private int photoLimit;

    @JsonProperty("start_date")
    @Column(name = "start_date", nullable = false)
    private LocalDateTime startDate;

    @JsonProperty("end_date")
    @Column(name = "end_date", nullable = false)
    private LocalDateTime endDate;

    @JsonProperty("image_uuid")
    @Column(name = "image_uuid")
    private UUID imageUuid;

    @JsonProperty("created_at")
    @Column(name = "created_at", nullable = false, updatable = false)
    private Timestamp createdAt;

    @Column(name = "status")
    @Enumerated(STRING)
    private Competition.Status status;

    @Column(name = "visibility")
    @Enumerated(STRING)
    private Competition.Visibility visibility;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "image_uuid", referencedColumnName = "uuid", insertable = false, updatable = false)
    private PhotoRecord photo;

    @JsonProperty("category_list")
    @OneToMany(
            mappedBy = "competitionRecord",
            cascade = {
                    CascadeType.DETACH,
                    CascadeType.MERGE,
                    CascadeType.PERSIST,
                    CascadeType.REFRESH,
                    CascadeType.REMOVE
            }
    )
    private List<CategoryRecord> categoryRecordList;

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

    public void addCategory(CategoryRecord categoryRecord) {
        if (categoryRecordList == null) {
            categoryRecordList = new ArrayList<>();
        }
        categoryRecordList.add(categoryRecord);
        categoryRecord.setCompetitionRecord(this);
    }
}
