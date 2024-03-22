package lt.techin.lsf.persistance.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "evaluation")
public class EvaluationRecord {

    @Id
    @Column(name = "uuid", nullable = false)
    private UUID uuid;

    @Column(name = "jury_id", nullable = false)
    private UUID juryId;

    @Column(name = "submission_id")
    private int submissionId;

    @Column(name = "created_at")
    private Timestamp createdAt;

    @Column(name = "liked")
    private boolean liked;

    @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinColumn(name = "photo_id")
    private PhotoRecord photoRecord;


    public EvaluationRecord setupNewEvaluation() {
        setGeneratedUuid();
        setCreatedAtNow();

        return this;
    }

    private EvaluationRecord setCreatedAtNow() {
        createdAt = new Timestamp(System.currentTimeMillis());

        return this;
    }

    public EvaluationRecord setGeneratedUuid() {
        uuid = UUID.randomUUID();

        return this;
    }
}
