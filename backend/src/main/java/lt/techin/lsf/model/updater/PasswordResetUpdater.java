package lt.techin.lsf.model.updater;

import lt.techin.lsf.persistance.model.UserRecord;
import lt.techin.lsf.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class PasswordResetUpdater {

    private final JwtService jwtService;

    @Autowired
    public PasswordResetUpdater(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    public void initializePasswordReset(UserRecord existingUser) {
        if (existingUser != null) {
            LocalDateTime now = LocalDateTime.now();
            existingUser.setPasswordResetRequestAt(now);
            String token = jwtService.generatePasswordResetToken(existingUser.getEmail(), 1000 * 60 * 30);
            existingUser.setPasswordResetToken(token);
        }
    }
}