package lt.techin.lsf.persistance;

import jakarta.transaction.Transactional;
import lt.techin.lsf.persistance.model.UserRecord;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<UserRecord, UUID> {

    UserRecord findByUuidAllIgnoreCase(UUID uuid);

    boolean existsByUuid(UUID uuid);

    UserRecord findByEmailIgnoreCase(String email);

    boolean existsByEmail(String email);

    @Transactional
    void deleteByEmail(String email);

    UserRecord findByPasswordResetToken(String passwordResetToken);

    Page<UserRecord> findAll(Pageable pageable);
}
