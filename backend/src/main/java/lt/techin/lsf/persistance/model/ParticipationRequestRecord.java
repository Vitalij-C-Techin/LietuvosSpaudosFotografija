package lt.techin.lsf.persistance.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lt.techin.lsf.model.ParticipationRequest;

import java.sql.Timestamp;
import java.util.UUID;

import static jakarta.persistence.EnumType.STRING;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "`participation_request`")
public class ParticipationRequestRecord {
    @Id
    @Column(name = "uuid", nullable = false)
    private UUID uuid;

    @Column(name = "user_uuid", nullable = false)
    private UUID userUuid;

    @Column(name = "competition_uuid", nullable = false)
    private UUID competitionUuid;

    @Column(name = "status", nullable = false)
    @Enumerated(STRING)
    private ParticipationRequest.Status status;

    @Column(name = "created_at", nullable = false)
    private Timestamp createdAt;

    @Column(name = "approved_by")
    private UUID approvedBy;

    @Column(name = "approved_at")
    private Timestamp approvedAt;

    public void setupNewRequest() {
        status = ParticipationRequest.Status.PENDING;

        setGeneratedUuid();
        setCreatedAtNow();
    }

    public void setGeneratedUuid() {
        uuid = UUID.randomUUID();
    }

    public void setCreatedAtNow() {
        createdAt = new Timestamp(System.currentTimeMillis());
    }

    public void setApprovedAtNow() {
        approvedAt = new Timestamp(System.currentTimeMillis());
    }
}
