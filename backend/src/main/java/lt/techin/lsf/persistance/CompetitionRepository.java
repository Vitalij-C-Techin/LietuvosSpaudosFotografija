package lt.techin.lsf.persistance;

import lt.techin.lsf.persistance.model.CompetitionRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@Repository
public interface CompetitionRepository extends JpaRepository<CompetitionRecord, UUID> {
}
