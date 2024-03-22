package lt.techin.lsf.persistance;

import lt.techin.lsf.persistance.model.PhotoRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PhotoRepository extends JpaRepository<PhotoRecord, Long> {
}
