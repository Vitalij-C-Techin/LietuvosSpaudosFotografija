package lt.techin.lsf.persistance;

import lt.techin.lsf.persistance.model.EvaluationRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface EvaluationRepository extends JpaRepository<EvaluationRecord, UUID>{
    EvaluationRecord findByJuryIdAndPhotoRecord_Uuid(UUID juryId, UUID photoId);

}
