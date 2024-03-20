package lt.techin.lsf.persistance;

import lt.techin.lsf.persistance.model.AlbumRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface AlbumRepository extends JpaRepository<AlbumRecord, UUID> {
    AlbumRecord findByUuid(UUID uuid);
}
