package lt.techin.lsf.persistance;

import lt.techin.lsf.model.ParticipationRequest;
import lt.techin.lsf.persistance.model.ParticipationRequestRecord;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ParticipationRequestRepository extends JpaRepository<ParticipationRequestRecord, UUID> {

    ParticipationRequestRecord findByUuid(UUID uuid);

    boolean existsByUuid(UUID uuid);

    void deleteByUuid(UUID uuid);

    ParticipationRequestRecord findByUserUuidAndCompetitionUuid(UUID userUuid, UUID competitionUuid);

    boolean existsByUserUuidAndCompetitionUuid(UUID userUuid, UUID competitionUuid);

    Page<ParticipationRequestRecord> findByStatus(ParticipationRequest.Status status, Pageable pageable);
}