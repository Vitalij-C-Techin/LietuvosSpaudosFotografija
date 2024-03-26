package lt.techin.lsf.persistance.model;

import com.fasterxml.jackson.annotation.JsonProperty;
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
public class SubmissionRecord {

    @Id
    @Column(name = "uuid", nullable = false)
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID uuid;

    @Column(name = "participant_uuid", nullable = false)
    @JsonProperty("participant_uuid")
    private UUID participantUuid;

    @Column(name = "competition_uuid", nullable = false)
    @JsonProperty("competition_uuid")
    private UUID competitionUuid;

    @Column(name = "category_uuid", nullable = false)
    @JsonProperty("category_uuid")
    private UUID categoryUuid;
}
