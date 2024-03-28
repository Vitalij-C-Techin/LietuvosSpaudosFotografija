package lt.techin.lsf.persistance.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;
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
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID uuid;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "submission_uuid", referencedColumnName = "uuid")
    private SubmissionRecord submission;

    @JsonProperty("name_lt")
    @Column(name = "name_lt")
    private String nameLt;

    @JsonProperty("name_en")
    @Column(name = "name_en")
    private String nameEn;

    @JsonProperty("description_lt")
    @Column(name = "description_lt")
    private String descriptionLt;

    @JsonProperty("description_en")
    @Column(name = "description_en")
    private String descriptionEn;

    @Column(name = "type")
    private String type;

    @Column(name = "status")
    private String status;

    /* --- */


    @OneToMany(
            mappedBy = "album",
            cascade = CascadeType.ALL
    )
    private Set<PhotoRecord> photoList = new HashSet<>();

    public void addPhoto(PhotoRecord photo) {
        if (null == photoList) {
            photoList = new HashSet<>();
        }

        photoList.add(photo);
    }
}