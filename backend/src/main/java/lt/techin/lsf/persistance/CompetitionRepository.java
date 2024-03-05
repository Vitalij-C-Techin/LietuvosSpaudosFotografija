package lt.techin.lsf.persistance;

import jakarta.transaction.Transactional;
import lt.techin.lsf.persistance.model.CompetitionRecord;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface CompetitionRepository extends JpaRepository<CompetitionRecord, UUID> {
    CompetitionRecord findByUuid(UUID uuid);

    boolean existsByUuid(UUID uuid);

    @Transactional
    void deleteByUuid(UUID uuid);

    Page<CompetitionRecord> findAll(Pageable pageable);
}
