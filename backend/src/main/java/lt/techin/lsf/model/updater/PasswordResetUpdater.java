package lt.techin.lsf.model.updater;

import lt.techin.lsf.persistance.model.UserRecord;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;
import java.util.UUID;

@Component
public class PasswordResetUpdater {

    public void initializePasswordReset(UserRecord existingUser) {
        if (existingUser != null) {
            LocalDateTime now = LocalDateTime.now();
            existingUser.setPasswordResetRequestAt(now);
            String passwordResetToken = UUID.randomUUID().toString();
            existingUser.setPasswordResetToken(passwordResetToken);
        }
    }
}