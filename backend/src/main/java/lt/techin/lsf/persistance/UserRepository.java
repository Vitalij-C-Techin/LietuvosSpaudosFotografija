package lt.techin.lsf.persistance;

import org.springframework.data.jpa.repository.JpaRepository;
import lt.techin.lsf.persistance.model.UserRecord;

import java.util.UUID;

public interface UserRepository extends JpaRepository<UserRecord, UUID> {

    UserRecord findByUuidAllIgnoreCase(UUID uuid);

    boolean existsByUuid(UUID uuid);

    UserRecord findByEmailIgnoreCase(String email);

    boolean existsByEmail(String email);
}
