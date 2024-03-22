package lt.techin.lsf.persistance.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "photo_item")
public class PhotoItemRecord {
    @Id
    @Column(name = "uuid", nullable = false)
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID uuid;

    @Column(name = "name")
    private String name;

    @Column(name = "width")
    private int width;

    @Column(name = "height")
    private int height;

    @Column(name = "size")
    private long size;

    @Column(name = "format")
    private String format;

    @Column(name = "type")
    private String type;

    @Column(name = "position")
    private int position;


    /* --- */


    @JsonIgnore
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "photo_uuid")
    private PhotoRecord photo;
}
