package lt.techin.lsf.persistance;

import jakarta.transaction.Transactional;
import lt.techin.lsf.persistance.model.CompetitionRecord;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface CompetitionRepository extends JpaRepository<CompetitionRecord, UUID> {
    CompetitionRecord findByUuid(UUID uuid);

    boolean existsByUuid(UUID uuid);

    @Transactional
    void deleteByUuid(UUID uuid);

    Page<CompetitionRecord> findAll(Pageable pageable);

    @Query("SELECT c " +
            "FROM CompetitionRecord c " +
            "JOIN ParticipationRequestRecord r ON c.uuid = r.competitionUuid " +
            "WHERE r.userUuid = :userUuid " +
            "AND r.status = 'PERMIT' " +
            "AND c.startDate < CURRENT_TIMESTAMP " +
            "AND c.endDate > CURRENT_TIMESTAMP " +
            "AND c.visibility = 'PUBLIC' "
    )
    Page<CompetitionRecord> findUserActiveCompetitions(@Param("userUuid") UUID userUuid, Pageable pageable);

    @Query("SELECT c " +
            "FROM CompetitionRecord c " +
            "LEFT JOIN ParticipationRequestRecord r ON c.uuid = r.competitionUuid " +
            "WHERE r.userUuid != :userUuid " +
            "OR r.userUuid IS NULL " +
            "AND r.userUuid IS NULL " +
            "AND c.startDate < CURRENT_TIMESTAMP " +
            "AND c.endDate > CURRENT_TIMESTAMP " +
            "AND c.visibility = 'PUBLIC' "
    )
    Page<CompetitionRecord> findUserParticipateCompetitions(@Param("userUuid") UUID userUuid, Pageable pageable);

    @Query("SELECT c " +
            "FROM CompetitionRecord c " +
            "WHERE c.endDate < CURRENT_TIMESTAMP " +
            //"AND c.status = 'EVALUATES' " + //TODO
            "AND c.visibility = 'PUBLIC' "
    )
    Page<CompetitionRecord> findJuryActiveCompetitions(Pageable pageable);
}
