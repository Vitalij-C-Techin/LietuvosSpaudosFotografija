package lt.techin.lsf.persistance;

import lt.techin.lsf.persistance.model.EvaluationRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface EvaluationRepository extends JpaRepository<EvaluationRecord, UUID>{
}
