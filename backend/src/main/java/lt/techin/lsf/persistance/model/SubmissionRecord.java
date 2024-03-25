package lt.techin.lsf.persistance.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "submission")
public class Submission {

    @Id
    @Column(name = "uuid", nullable = false)
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID uuid;

    @Column(name = "participant_uuid", nullable = false)
    private UUID participantUuid;

    @Column(name = "competition_uuid", nullable = false)
    private UUID competitionUuid;

    @Column(name = "category_uuid", nullable = false)
    private UUID categoryUuid;
}
