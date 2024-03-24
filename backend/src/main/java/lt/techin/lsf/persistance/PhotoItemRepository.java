package lt.techin.lsf.persistance;

import lt.techin.lsf.persistance.model.PhotoItemRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PhotoItemRepository extends JpaRepository<PhotoItemRecord, UUID> {
}
