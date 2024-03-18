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
@Table(name = "photo_item")
public class PhotoItemRecord {
    @Id
    @Column(name = "uuid", nullable = false)
    private UUID uuid;

    @Column(name = "photo_uuid")
    private UUID photoUuid;

    @Column(name = "width")
    private int width;

    @Column(name = "height")
    private int height;

    @Column(name = "size")
    private long size;

    @Column(name = "format")
    private String format;

    @Column(name = "path")
    private String path;
}
