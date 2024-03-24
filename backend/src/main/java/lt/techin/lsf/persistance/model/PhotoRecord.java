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
@Table(name = "photo")
public class PhotoRecord {
    @Id
    @Column(name = "uuid", nullable = false)
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID uuid;

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

    @Column(name = "position")
    private int position;

    @Column(name = "stage")
    private String stage;


    /* --- */


    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "album_uuid")
    private AlbumRecord album;


    @OneToMany(
            mappedBy = "photo",
            cascade = CascadeType.ALL
    )
    private Set<PhotoItemRecord> photoItemList = new HashSet<>();

    public void addPhotoItem(PhotoItemRecord photoItem) {
        if (null == photoItemList) {
            photoItemList = new HashSet<>();
        }

        photoItemList.add(photoItem);
    }
}


