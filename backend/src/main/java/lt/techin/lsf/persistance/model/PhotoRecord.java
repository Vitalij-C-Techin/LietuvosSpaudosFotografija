package lt.techin.lsf.persistance.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
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


    /* --- */


    @JsonIgnore
    @ManyToOne(cascade = CascadeType.ALL)
    //@JoinColumn(name = "album_uuid")
    private AlbumRecord album;


    @OneToMany(
            mappedBy = "photo",
            fetch = FetchType.EAGER,
            cascade = CascadeType.ALL
    )
    private Set<PhotoItemRecord> photoItemList;

    public void addPhotoItem(PhotoItemRecord photoItem) {
        Set<PhotoItemRecord> photoItemList = getPhotoItemList();

        if (null == photoItemList) {
            photoItemList = new HashSet<>();
        }

        photoItemList.add(photoItem);

        photoItem.setPhoto(this);
        setPhotoItemList(photoItemList);
    }
}


