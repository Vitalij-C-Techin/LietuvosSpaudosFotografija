package lt.techin.lsf.persistance.model;

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

    @Column(name = "submission_uuid")
    private UUID submissionUuid;

    @Column(name = "name_lt")
    private String nameLt;

    @Column(name = "name_en")
    private String nameEn;

    @Column(name = "description_lt")
    private String descriptionLt;

    @Column(name = "description_en")
    private String descriptionEn;

    @Column(name = "type")
    private String type;

    @Column(name = "status")
    private String status;


    /* --- */


    @OneToMany(
            mappedBy = "album",
            fetch = FetchType.EAGER,
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