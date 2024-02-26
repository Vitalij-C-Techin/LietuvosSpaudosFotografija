package lt.techin.lsf.persistance;

import jakarta.transaction.Transactional;
import lt.techin.lsf.persistance.model.UserRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserRepository extends JpaRepository<UserRecord, UUID> {

    UserRecord findByUuidAllIgnoreCase(UUID uuid);

    boolean existsByUuid(UUID uuid);

    UserRecord findByEmailIgnoreCase(String email);

    boolean existsByEmail(String email);

    @Transactional
    void deleteByEmail(String email);

    UserRecord findByPasswordResetToken(String passwordResetToken);
}
